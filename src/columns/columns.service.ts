import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";
import {CreateColumnDto} from "./dto/CreateColumnDto";
import {UpdateColumnDto} from "./dto/UpdateColumnDto";
import {ReorderColumnDto} from "./dto/ReorderColumnDto";

@Injectable()
export class ColumnsService {
    constructor(private prisma: PrismaService) {}

    async createColumn(userId: number, dto: CreateColumnDto) {
        const project = await this.prisma.project.findUnique({
            where: { id: dto.projectId },
        });

        if (!project || project.userId !== userId) {
            throw new ForbiddenException('this project belong to another user or doesn`t exist');
        }

        const columnsCount = await this.prisma.column.count({
            where: { projectId: dto.projectId },
        });

        return this.prisma.column.create({
            data: {
                name: dto.name,
                order: columnsCount + 1,
                projectId: dto.projectId,
            },
        });
    }

    async updateColumn(userId: number, columnId: number, dto: UpdateColumnDto) {
        const column = await this.prisma.column.findUnique({
            where: { id: columnId },
            include: { project: true },
        });

        if (!column || column.project.userId !== userId) {
            throw new ForbiddenException('this column belong to another user or doesn`t exist');
        }

        return this.prisma.column.update({
            where: { id: columnId },
            data: { name: dto.name },
        });
    }

    async deleteColumn(userId: number, columnId: number) {
        const column = await this.prisma.column.findUnique({
            where: { id: columnId },
            include: { project: true },
        });

        if (!column || column.project.userId !== userId) {
            throw new ForbiddenException('this column belong to another user or doesn`t exist');
        }

        await this.prisma.column.delete({ where: { id: columnId } });
        await this.reorderColumns(column.projectId);
    }

    async reorderColumns(projectId: number) {
        const columns = await this.prisma.column.findMany({
            where: { projectId },
            orderBy: { order: 'asc' },
        });

        for (let i = 0; i < columns.length; i++) {
            await this.prisma.column.update({
                where: { id: columns[i].id },
                data: { order: i + 1 },
            });
        }
    }

    async moveColumn(userId: number, columnId: number, dto: ReorderColumnDto) {
        const column = await this.prisma.column.findUnique({
            where: { id: columnId },
            include: { project: true },
        });

        if (!column || column.project.userId !== userId) {
            throw new ForbiddenException('this column belong to another user or doesn`t exist');
        }

        const columns = await this.prisma.column.findMany({
            where: { projectId: column.projectId },
            orderBy: { order: 'asc' },
        });

        const oldPosition = column.order;
        const newPosition = dto.newPosition;

        if (newPosition < 1 || newPosition > columns.length) {
            throw new NotFoundException('Invalid position');
        }

        const updatedColumns = columns.map(col => {
            if (col.order === oldPosition) {
                return { ...col, order: newPosition };
            } else if (oldPosition < newPosition && col.order > oldPosition && col.order <= newPosition) {
                return { ...col, order: col.order - 1 };
            } else if (oldPosition > newPosition && col.order < oldPosition && col.order >= newPosition) {
                return { ...col, order: col.order + 1 };
            }
            return col;
        });

        const updatePromises = updatedColumns.map(col =>
            this.prisma.column.update({
                where: { id: col.id },
                data: { order: col.order },
            })
        );

        await Promise.all(updatePromises);
    }
}
