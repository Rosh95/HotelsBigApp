import { PrismaService } from "../../prisma/prisma.service";
import { CreateTaskDto } from "./dto/CreateTaskDto";
import { UpdateTaskDto } from "./dto/UpdateTaskDto";
import { ReorderTaskDto } from "./dto/ReorderTaskDto";
export declare class TasksService {
    private prisma;
    constructor(prisma: PrismaService);
    createTask(userId: number, dto: CreateTaskDto): Promise<{
        id: number;
        title: string;
        description: string;
        createdAt: Date;
        order: number;
        columnId: number;
    }>;
    updateTask(userId: number, taskId: number, dto: UpdateTaskDto): Promise<{
        id: number;
        title: string;
        description: string;
        createdAt: Date;
        order: number;
        columnId: number;
    }>;
    deleteTask(userId: number, taskId: number): Promise<void>;
    reorderTasks(columnId: number): Promise<void>;
    moveTask(userId: number, taskId: number, dto: ReorderTaskDto): Promise<void>;
}
