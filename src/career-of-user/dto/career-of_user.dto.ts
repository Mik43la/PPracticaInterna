import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CareerOfUserDto {
  @IsNotEmpty()
  @IsString()
  usercode: string;

  @IsNotEmpty()
  @IsNumber()
  career: number;

  @IsNotEmpty()
  @IsString()
  userName: string;
}
