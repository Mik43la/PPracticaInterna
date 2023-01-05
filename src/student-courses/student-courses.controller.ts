import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { StudentCoursesDto } from './dto/student-courses.dto';
import { StudentCoursesService } from './student-courses.service';
import { JwtGuard } from 'src/auth/guard';
import { Roles } from 'src/role/decorators/role.decorator';
import { RoleGuard } from 'src/role/guards/role.guard';

@UseGuards(JwtGuard, RoleGuard)
@Controller('student-courses')
export class StudentCoursesController {
  constructor(private studentCoursesService: StudentCoursesService) {}

  @Roles('admin', 'jefe')
  @Post('add')
  create(@Body() dto: StudentCoursesDto) {
    return this.studentCoursesService.create(dto);
  }

  @Roles('admin', 'jefe')
  @Get()
  findAll() {
    return this.studentCoursesService.findAll();
  }

  @Roles('admin', 'jefe', 'student')
  @Get(':studentCode/:courseId')
  findCourseOfStudent(
    @Param('studentCode') studentCode,
    @Param('courseId') courseId,
  ) {
    return this.studentCoursesService.findCourseOfStudent(
      studentCode,
      courseId,
    );
  }

  @Roles('admin', 'jefe', 'student')
  @Get(':studentCode')
  findAllCoursesOfStudent(@Param('studentCode') studentCode) {
    return this.studentCoursesService.findAllCoursesOfStudent(studentCode);
  }

  @Roles('admin', 'jefe')
  @Get(':courseId')
  findCourseStudents(@Param('courseId') courseId) {
    return this.studentCoursesService.findCourseStudents(courseId);
  }

  @Roles('admin', 'jefe')
  @Delete(':studentCode/:courseId')
  delete(@Param('studentCode') studentCode, @Param('courseId') courseId) {
    return this.studentCoursesService.delete(studentCode, courseId);
  }
}
