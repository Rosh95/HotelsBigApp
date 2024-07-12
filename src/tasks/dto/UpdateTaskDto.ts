import { PartialType } from '@nestjs/mapped-types';
import {CreateTaskDto} from "./CreateTaskDto";
import {IsNotEmpty, IsString, Length} from "class-validator";

export class UpdateTaskDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 255)
    title: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 1000)
    description: string;
}
