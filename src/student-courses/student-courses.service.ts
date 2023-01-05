import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { StudentCoursesDto } from './dto';

@Injectable()
export class StudentCoursesService {
  constructor(private prisma: PrismaService) {}
  async create(dto: StudentCoursesDto) {
    try {
      const studentCourse = await this.prisma.studentCourses.create({
        data: {
          studentCode: dto.studentCode,
          courseId: parseInt(dto.courseId.toString()),
        },
      });
      return studentCourse;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == 'P2002') {
          throw new ForbiddenException(
            'This student is already enrolled to this course.',
          );
        }
      }
      throw error;
    }
  }

  findAll() {
    return this.prisma.studentCourses.findMany({});
  }

  findCourseOfStudent(code: string, idData: number) {
    return this.prisma.studentCourses.findFirst({
      where: {
        studentCode: code,
        courseId: parseInt(idData.toString()),
      },
    });
  }

  async findAllCoursesOfStudent(code: string) {
    const codes = await this.prisma.studentCourses.findMany({
      where: {
        studentCode: code,
      },
    });
    let results = [];
    // return await codes.map(
    //   async (code) =>
    //     await this.prisma.course.findFirst({
    //       where: {
    //         id: code.courseId,
    //       },
    //     }),
    // );
    for (let i = 0; i < codes.length; i++) {
      results.push(
        await this.prisma.course.findFirst({
          where: {
            id: codes[i].courseId,
          },
        }),
      );
    }
    return results;
  }

  findCourseStudents(idData: number) {
    return this.prisma.studentCourses.findMany({
      where: {
        courseId: parseInt(idData.toString()),
      },
    });
  }

  async delete(code: string, idData: number) {
    const studentCourse = await this.prisma.studentCourses.findMany({
      where: {
        studentCode: code,
        courseId: parseInt(idData.toString()),
      },
    });

    if (!studentCourse) {
      throw new ForbiddenException(
        'This student is not enrolled to his course.',
      );
    }

    return this.prisma.studentCourses.deleteMany({
      where: {
        studentCode: code,
        courseId: parseInt(idData.toString()),
      },
    });
  }
}
