import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  isNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class StudentCoursesDto {
  @IsNotEmpty()
  @IsString()
  studentCode: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @IsInt()
  courseId: number;
}
