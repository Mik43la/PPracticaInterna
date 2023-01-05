import { IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator";


export class UserDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    // @IsNotEmpty()
    // @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    code: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    rolename: string;

    
    deactivationTime: Date;
    



}