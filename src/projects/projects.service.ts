import {BadRequestException, Injectable} from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";
import {CreateProjectDto} from "./dto/CreateProjectDto";
import {UpdateProjectDto} from "./dto/UpdateColumnDto";
import {FORBIDDEN_MESSAGE} from "@nestjs/core/guards";

@Injectable()
export class ProjectsService {
    constructor(private prisma: PrismaService) {
    }

    create(createProjectDto: CreateProjectDto) {
        return this.prisma.project.create({data: createProjectDto});
    }

    findAll() {
        return this.prisma.project.findMany({
            include: {
                columns: {
                    include: {
                        project: true
                    },
                    orderBy: {order: 'asc'},
                },

            }

        });
    }

    findOne(id: number) {
        return this.prisma.project.findUnique({
            where: {id},
            include: {
                columns: {
                    include: {
                        project: true
                    },
                    orderBy: {order: 'asc'},
                },

            }
        });
    }

    update(projectId: number, updateProjectDto: UpdateProjectDto, currentUserId: number) {
        if (currentUserId !== updateProjectDto.userId) {
            throw new BadRequestException('this project belong to another user or doesn`t exist')
        }
        return this.prisma.project.update({
            where: {id: projectId},
            data: updateProjectDto,
        });
    }

    async remove(projectId: number, currentUserId: number) {
        const currentProject = await this.prisma.project.findUnique({
            where: {
                id: projectId
            }
        })
        if (!currentProject || currentUserId !== currentProject.userId) {
            throw new BadRequestException('this project belong to another user or doesn`t exist')
        }
        const isDeleted = await this.prisma.project.delete({where: {id: projectId}});

        return isDeleted.id || 'false'
    }
}
