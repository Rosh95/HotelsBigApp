import {IsInt, IsNotEmpty} from "class-validator";

export class ReorderColumnDto {
    @IsInt()
    @IsNotEmpty()
    newPosition: number;
}