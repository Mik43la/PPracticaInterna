import { IsNotEmpty, IsString } from "class-validator";


export class SeasonDto {
    @IsNotEmpty()
    @IsString()
    name: string;

}