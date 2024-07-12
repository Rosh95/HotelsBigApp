import { ColumnsService } from './columns.service';
import { CreateColumnDto } from "./dto/CreateColumnDto";
import { UpdateColumnDto } from "./dto/UpdateColumnDto";
import { ReorderColumnDto } from "./dto/ReorderColumnDto";
export declare class ColumnsController {
    private columnsService;
    constructor(columnsService: ColumnsService);
    createColumn(dto: CreateColumnDto, userId: number): Promise<{
        id: number;
        name: string;
        order: number;
        projectId: number;
    }>;
    updateColumn(columnId: number, dto: UpdateColumnDto, userId: number): Promise<{
        id: number;
        name: string;
        order: number;
        projectId: number;
    }>;
    deleteColumn(columnId: number, userId: number): Promise<void>;
    moveColumn(columnId: number, dto: ReorderColumnDto, userId: number): Promise<void>;
}
