import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class UpdateDto {

    username: string;

    email: string;

    name: string;
   
    code: string;

    password: string;

    rolename: string;

    deactivationTime: Date;
    



}