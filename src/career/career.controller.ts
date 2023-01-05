import {
  Controller,
  Delete,
  Put,
  Get,
  Param,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CareerService } from './career.service';
import { CareerDto } from './dto';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { JwtGuard } from 'src/auth/guard';
import { RoleGuard } from 'src/role/guards/role.guard';
import { Roles } from 'src/role/decorators/role.decorator';

@UseGuards(JwtGuard, RoleGuard)
@Controller('career')
export class CareerController {
  constructor(private careerService: CareerService) {}

  @Roles('admin', 'jefe')
  @Post('add')
  create(@Body() dto: CareerDto) {
    return this.careerService.create(dto);
  }

  @Roles('admin', 'jefe')
  @Put('update/:id')
  update(@Param('id', ParseIntPipe) id, @Body() dto: CareerDto) {
    return this.careerService.update(id, dto);
  }

  @Roles('admin', 'jefe')
  @Get()
  findAll() {
    return this.careerService.findAll();
  }
  @Roles('admin', 'jefe')
  @Get('head/:username')
  findByfacultyHead(@Param('username') username) {
    return this.careerService.findByfacultyHead(username);
  }

  @Roles('admin', 'jefe')
  @Get(':id')
  find(@Param('id', ParseIntPipe) id) {
    return this.careerService.find(id);
  }

  @Roles('admin')
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id) {
    return this.careerService.delete(id);
  }
}
