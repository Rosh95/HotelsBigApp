import {IsInt, IsNotEmpty, IsString, Length} from "class-validator";

export class UpdateProjectDto  {
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

