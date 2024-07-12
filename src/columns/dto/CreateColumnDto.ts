import {IsInt, IsNotEmpty, IsString, Length, Min} from 'class-validator';

export class CreateColumnDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 255)
    name: string;

    @IsInt()
    @Min(0)
    order: number;

    @IsInt()
    projectId: number;
}
