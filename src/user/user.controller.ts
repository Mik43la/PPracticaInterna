import {
  Controller,
  Delete,
  Body,
  Put,
  Get,
  Param,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist';
import { UpdateDto, UserDto } from './dto';
import { UserService } from './user.service';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { RoleGuard } from 'src/role/guards/role.guard';
import { Roles } from 'src/role/decorators/role.decorator';

@UseGuards(JwtGuard, RoleGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Roles('admin')
  @Post('add')
  create(@Body() dto: UserDto) {
    return this.userService.create(dto);
  }

  @Roles('admin', 'jefe')
  @Put('update/:id')
  update(@Param('id') id, @Body() dto: UpdateDto) {
    return this.userService.update(id, dto);
  }

  @Roles('admin')
  @Put('activate/:id')
  activate(@Param('id') id) {
    return this.userService.activate(id);
  }

  @Roles('admin', 'jefe')
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Roles('admin', 'jefe')
  @Get(':id')
  find(@Param('id') id) {
    return this.userService.find(id);
  }

  @Roles('admin')
  @Delete(':id')
  delete(@Param('id') id) {
    return this.userService.delete(id);
  }

  @Get('info/permission/')
  getMe(@GetUser() user: User, @GetUser('rolename') rolename: string) {
    console.log({
      rolename,
    });

    return user;
  }
  @Roles('admin', 'jefe')
  @Get('role/:rolename')
  findByRole(@Param('rolename') rolename) {
    return this.userService.findByRole(rolename);
  }
}
