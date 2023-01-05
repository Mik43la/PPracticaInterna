import { IsInt, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";
import { Type } from 'class-transformer';

export class CourseDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    @Max(12)
    @IsInt()
    startTerm: number ;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    @Max(12)
    @IsInt()
    endTerm: number;

    @IsNotEmpty()
    @IsString()
    schedule: string;

    @IsNotEmpty()
    @IsString()
    lecturer: string;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    @IsInt()
    credits: number;

    @IsNotEmpty()
    @IsString()
    ownerUsername: string;

    @IsNotEmpty()
    @IsString()
    seasonName: string;


}