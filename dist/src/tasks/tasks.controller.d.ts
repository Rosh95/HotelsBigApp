import { TasksService } from './tasks.service';
import { CreateTaskDto } from "./dto/CreateTaskDto";
import { UpdateTaskDto } from "./dto/UpdateTaskDto";
import { ReorderTaskDto } from "./dto/ReorderTaskDto";
export declare class TasksController {
    private tasksService;
    constructor(tasksService: TasksService);
    createTask(dto: CreateTaskDto, userId: number): Promise<{
        id: number;
        title: string;
        description: string;
        createdAt: Date;
        order: number;
        columnId: number;
    }>;
    updateTask(taskId: number, dto: UpdateTaskDto, userId: number): Promise<{
        id: number;
        title: string;
        description: string;
        createdAt: Date;
        order: number;
        columnId: number;
    }>;
    deleteTask(taskId: number, userId: number): Promise<void>;
    moveTask(taskId: number, dto: ReorderTaskDto, userId: number): Promise<void>;
}
