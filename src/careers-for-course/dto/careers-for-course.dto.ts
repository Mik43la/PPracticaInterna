import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CareersForCourseDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @IsInt()
  courseId: number;

  @IsNotEmpty()
  @IsString()
  careerId: string;
}
