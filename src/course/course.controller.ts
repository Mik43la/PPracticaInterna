import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseDto } from './dto';
import { JwtGuard } from 'src/auth/guard';
import { RoleGuard } from 'src/role/guards/role.guard';
import { Roles } from 'src/role/decorators/role.decorator';

@UseGuards(JwtGuard, RoleGuard)
@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}
  @Post('add')
  @Roles('admin', 'jefe')
  create(@Body() dto: CourseDto) {
    return this.courseService.create(dto);
  }

  @Roles('admin', 'jefe')
  @Put('update/:id')
  update(@Param('id') id, @Body() dto: CourseDto) {
    return this.courseService.update(id, dto);
  }

  @Roles('admin', 'jefe')
  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Roles('admin', 'jefe', 'student')
  @Get(':id')
  find(@Param('id') id) {
    return this.courseService.find(id);
  }

  @Roles('admin', 'jefe')
  @Delete(':id')
  delete(@Param('id') id) {
    return this.courseService.delete(id);
  }
}
