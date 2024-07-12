import {IsString, IsNotEmpty, Length, IsInt} from 'class-validator';

export class CreateProjectDto {
    @IsInt()
    @IsNotEmpty()
    userId: number

    @IsString()
    @IsNotEmpty()
    @Length(1, 255)
    name: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 1000)
    description: string;
}
