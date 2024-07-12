import { PrismaService } from "../../prisma/prisma.service";
import { CreateColumnDto } from "./dto/CreateColumnDto";
import { UpdateColumnDto } from "./dto/UpdateColumnDto";
import { ReorderColumnDto } from "./dto/ReorderColumnDto";
export declare class ColumnsService {
    private prisma;
    constructor(prisma: PrismaService);
    createColumn(userId: number, dto: CreateColumnDto): Promise<{
        id: number;
        name: string;
        order: number;
        projectId: number;
    }>;
    updateColumn(userId: number, columnId: number, dto: UpdateColumnDto): Promise<{
        id: number;
        name: string;
        order: number;
        projectId: number;
    }>;
    deleteColumn(userId: number, columnId: number): Promise<void>;
    reorderColumns(projectId: number): Promise<void>;
    moveColumn(userId: number, columnId: number, dto: ReorderColumnDto): Promise<void>;
}
