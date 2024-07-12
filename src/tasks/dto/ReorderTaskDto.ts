import {IsInt, IsNotEmpty} from "class-validator";

export class ReorderTaskDto {
    @IsInt()
    @IsNotEmpty()
    newPosition: number;

    @IsInt()
    @IsNotEmpty()
    newColumnId: number;
}