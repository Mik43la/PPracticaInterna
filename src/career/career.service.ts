import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { CareerDto } from './dto';

@Injectable()
export class CareerService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CareerDto) {
    try {
      const career = await this.prisma.career.create({
        data: {
          name: dto.name,
          facultyHeadUsername: dto.facultyHeadUsername,
        },
      });
      return career;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('This career already exists');
        }
      }
      throw error;
    }
  }

  async update(idCareer: number, dto: CareerDto) {
    const career = await this.prisma.career.findUnique({
      where: {
        id: idCareer,
      },
    });

    if (!career) {
      throw new ForbiddenException('This career does not exist.');
    }

    return this.prisma.career.update({
      where: {
        id: idCareer,
      },
      data: {
        name: dto.name,
        facultyHeadUsername: dto.facultyHeadUsername,
      },
    });
  }

  findAll() {
    return this.prisma.career.findMany({});
  }

  findByfacultyHead(idHead: string) {
    return this.prisma.career.findFirst({
      where: {
        facultyHeadUsername: idHead,
      },
    });
  }

  find(idCareer: number) {
    return this.prisma.career.findFirst({
      where: {
        id: idCareer,
      },
    });
  }

  async delete(idCareer: number) {
    const career = await this.prisma.career.findUnique({
      where: {
        id: idCareer,
      },
    });
    console.log(career);
    if (!career) {
      throw new ForbiddenException('This career does not exist.');
    }

    return this.prisma.career.delete({
      where: {
        id: idCareer,
      },
    });
  }
}
