import {IsInt, IsNotEmpty, IsOptional, IsString, Length, MaxLength} from 'class-validator';

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 255)
    title: string;

    @IsString()
    @IsOptional()
    @Length(1, 1000)
    description?: string;

    @IsInt()
    columnId: number;

    @IsInt()
    @IsOptional()
    order?: number;
}
