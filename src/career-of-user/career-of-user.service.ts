import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { CareerOfUserDto } from './dto';

@Injectable()
export class CareerOfUserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CareerOfUserDto) {
    try {
      const careerOfUser = await this.prisma.careerOfUser.create({
        data: {
          usercode: dto.usercode,
          userName: dto.userName,
          career: parseInt(dto.career.toString()),
        },
      });
      return careerOfUser;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'This user already has a career registered for them. ',
          );
        }
      }
      throw error;
    }
  }

  async update(code: string, career: number, dto: CareerOfUserDto) {
    const careerOfUser = await this.prisma.careerOfUser.findMany({
      where: {
        usercode: dto.usercode,
        career: dto.career,
      },
    });

    if (!careerOfUser) {
      throw new ForbiddenException(
        'This user does not have a career registered for them.',
      );
    }

    return this.prisma.careerOfUser.updateMany({
      where: {
        usercode: code,
        career: parseInt(career.toString()),
      },
      data: {
        usercode: dto.usercode,
        userName: dto.userName,
        career: dto.career,
      },
    });
  }

  findAll() {
    return this.prisma.careerOfUser.findMany({});
  }

  findByCode(code: string) {
    return this.prisma.careerOfUser.findUnique({
      where: {
        usercode: code,
      },
    });
  }

  findByCareer(careerCode: number) {
    console.log({ careerCode });
    return this.prisma.careerOfUser.findMany({
      where: {
        career: parseInt(careerCode.toString()),
      },
    });
  }

  async delete(code: string, careerCode: number) {
    const careerOfUser = await this.prisma.careerOfUser.findMany({
      where: {
        usercode: code,
        career: parseInt(careerCode.toString()),
      },
    });

    if (!careerOfUser) {
      throw new ForbiddenException(
        'This user does not have a career registered for them.',
      );
    }

    return this.prisma.careerOfUser.deleteMany({
      where: {
        usercode: code,
        career: parseInt(careerCode.toString()),
      },
    });
  }
}
