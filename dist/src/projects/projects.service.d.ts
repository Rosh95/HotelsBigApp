import { PrismaService } from "../../prisma/prisma.service";
import { CreateProjectDto } from "./dto/CreateProjectDto";
import { UpdateProjectDto } from "./dto/UpdateColumnDto";
export declare class ProjectsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createProjectDto: CreateProjectDto): import(".prisma/client").Prisma.Prisma__ProjectClient<{
        id: number;
        name: string;
        description: string;
        createdAt: Date;
        userId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        columns: ({
            project: {
                id: number;
                name: string;
                description: string;
                createdAt: Date;
                userId: number;
            };
        } & {
            id: number;
            name: string;
            order: number;
            projectId: number;
        })[];
    } & {
        id: number;
        name: string;
        description: string;
        createdAt: Date;
        userId: number;
    })[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__ProjectClient<{
        columns: ({
            project: {
                id: number;
                name: string;
                description: string;
                createdAt: Date;
                userId: number;
            };
        } & {
            id: number;
            name: string;
            order: number;
            projectId: number;
        })[];
    } & {
        id: number;
        name: string;
        description: string;
        createdAt: Date;
        userId: number;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(projectId: number, updateProjectDto: UpdateProjectDto, currentUserId: number): import(".prisma/client").Prisma.Prisma__ProjectClient<{
        id: number;
        name: string;
        description: string;
        createdAt: Date;
        userId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(projectId: number, currentUserId: number): Promise<number | "false">;
}
