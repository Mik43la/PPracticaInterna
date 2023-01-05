import {
  Controller,
  Post,
  Delete,
  Body,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CareersForCourseService } from './careers-for-course.service';
import { CareersForCourseDto } from './dto';
import { JwtGuard } from 'src/auth/guard';
import { Roles } from 'src/role/decorators/role.decorator';
import { RoleGuard } from 'src/role/guards/role.guard';

@UseGuards(JwtGuard, RoleGuard)
@Controller('course-career')
export class CareersForCourseController {
  constructor(private careerForCourseService: CareersForCourseService) {}

  @Roles('admin', 'jefe')
  @Post('add')
  create(@Body() dto: CareersForCourseDto) {
    return this.careerForCourseService.create(dto);
  }

  @Roles('admin', 'jefe')
  @Get()
  findAll() {
    return this.careerForCourseService.findAll();
  }

  @Roles('admin', 'jefe')
  @Get(':courseId')
  findAllCareersOfOneCourse(@Param('courseId') courseId) {
    return this.careerForCourseService.findAllCareersOfOneCourse(courseId);
  }

  @Roles('admin', 'jefe')
  @Get(':careerId')
  findAllCoursesOfOneCareer(@Param('careerId') careerId) {
    return this.careerForCourseService.findAllCoursesOfOneCareer(careerId);
  }

  @Roles('admin', 'jefe')
  @Delete(':courseId/:careerId')
  delete(@Param('courseId') courseId, @Param('careerId') careerId) {
    return this.careerForCourseService.delete(courseId, careerId);
  }
}
