import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";
import {CreateTaskDto} from "./dto/CreateTaskDto";
import {UpdateTaskDto} from "./dto/UpdateTaskDto";
import {ReorderTaskDto} from "./dto/ReorderTaskDto";


@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService) {}

    async createTask(userId: number, dto: CreateTaskDto) {
        const column = await this.prisma.column.findUnique({
            where: { id: dto.columnId },
            include: { project: true },
        });

        if (!column || column.project.userId !== userId) {
            throw new ForbiddenException('Access denied');
        }

        const tasksCount = await this.prisma.task.count({
            where: { columnId: dto.columnId },
        });

        return this.prisma.task.create({
            data: {
                title: dto.title,
                description: dto.description,
                createdAt: new Date(),
                order: tasksCount + 1,
                columnId: dto.columnId,
            },
        });
    }

    async updateTask(userId: number, taskId: number, dto: UpdateTaskDto) {
        const task = await this.prisma.task.findUnique({
            where: { id: taskId },
            include: { column: { include: { project: true } } },
        });

        if (!task || task.column.project.userId !== userId) {
            throw new ForbiddenException('Access denied');
        }

        return this.prisma.task.update({
            where: { id: taskId },
            data: {
                title: dto.title,
                description: dto.description,
            },
        });
    }

    async deleteTask(userId: number, taskId: number) {
        const task = await this.prisma.task.findUnique({
            where: { id: taskId },
            include: { column: { include: { project: true } } },
        });

        if (!task || task.column.project.userId !== userId) {
            throw new ForbiddenException('Access denied');
        }

        await this.prisma.task.delete({ where: { id: taskId } });
        await this.reorderTasks(task.columnId);
    }

    async reorderTasks(columnId: number) {
        const tasks = await this.prisma.task.findMany({
            where: { columnId },
            orderBy: { order: 'asc' },
        });

        for (let i = 0; i < tasks.length; i++) {
            await this.prisma.task.update({
                where: { id: tasks[i].id },
                data: { order: i + 1 },
            });
        }
    }

    async moveTask(userId: number, taskId: number, dto: ReorderTaskDto) {
        const task = await this.prisma.task.findUnique({
            where: { id: taskId },
            include: { column: { include: { project: true } } },
        });

        if (!task || task.column.project.userId !== userId) {
            throw new ForbiddenException('Access denied');
        }

        const oldColumnId = task.columnId;
        const newColumnId = dto.newColumnId;

        const tasksInOldColumn = await this.prisma.task.findMany({
            where: { columnId: oldColumnId },
            orderBy: { order: 'asc' },
        });

        const tasksInNewColumn = await this.prisma.task.findMany({
            where: { columnId: newColumnId },
            orderBy: { order: 'asc' },
        });

        const oldPosition = task.order;
        const newPosition = dto.newPosition;

        if (newPosition < 1 || newPosition > tasksInNewColumn.length + 1) {
            throw new NotFoundException('Invalid position');
        }

        const updatedOldColumnTasks = tasksInOldColumn
            .filter(t => t.id !== taskId)
            .map((t, index) => ({
                ...t,
                order: index + 1,
            }));

        const updatedNewColumnTasks = [
            ...tasksInNewColumn.slice(0, newPosition - 1),
            { ...task, order: newPosition, columnId: newColumnId },
            ...tasksInNewColumn.slice(newPosition - 1).map(t => ({
                ...t,
                order: t.order + 1,
            })),
        ];

        const updatePromises = [
            ...updatedOldColumnTasks.map(t =>
                this.prisma.task.update({
                    where: { id: t.id },
                    data: { order: t.order },
                })
            ),
            ...updatedNewColumnTasks.map(t =>
                this.prisma.task.update({
                    where: { id: t.id },
                    data: {
                        order: t.order,
                        columnId: t.columnId,
                    },
                })
            ),
        ];

        await Promise.all(updatePromises);
    }
}
