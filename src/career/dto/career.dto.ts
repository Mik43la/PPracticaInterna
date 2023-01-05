import { IsNotEmpty, IsString } from "class-validator";


export class CareerDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    facultyHeadUsername: string;

    

}