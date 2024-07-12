import {IsInt, IsNotEmpty, IsString, Min, MaxLength, IsEmail} from 'class-validator';

export class CreateUserDto {


    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
