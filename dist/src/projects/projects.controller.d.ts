import { CreateProjectDto } from "./dto/CreateProjectDto";
import { UpdateProjectDto } from "./dto/UpdateColumnDto";
import { ProjectsService } from "./projects.service";
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
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
    findOne(id: string): import(".prisma/client").Prisma.Prisma__ProjectClient<{
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
    update(id: string, updateProjectDto: UpdateProjectDto, currentUserId: number): import(".prisma/client").Prisma.Prisma__ProjectClient<{
        id: number;
        name: string;
        description: string;
        createdAt: Date;
        userId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string, currentUserId: number): Promise<number | "false">;
}
