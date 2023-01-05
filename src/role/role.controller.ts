import { Controller, Delete, Put, Get, Param, Post, Body, UseGuards } from "@nestjs/common";
import { RoleDto } from "./dto";
import { RoleService } from "./role.service";
import { JwtGuard } from "src/auth/guard";
import { Roles } from "./decorators/role.decorator";
import { RoleGuard } from "./guards/role.guard";

@UseGuards(JwtGuard, RoleGuard)
@Controller('role')
export class RoleController{
    constructor(private roleService: RoleService) {}

    @Roles('admin')
    @Post('add')
    create(@Body() dto:RoleDto) {
        return this.roleService.create(dto)
    }

    @Roles('admin')
    @Put('update/:id') 
    update(@Param('id') id:string, @Body() dto:RoleDto){
        return this.roleService.update(id, dto)
    }

    @Roles('admin')
    @Get()
    findAll() {
        return this.roleService.findAll()
    }

    @Roles('admin')
    @Get(':id')
    find(@Param('id') id) {
        return this.roleService.find(id)
    }

    @Roles('admin')
    @Delete(':id')
    delete(@Param('id') id) {
        return this.roleService.delete(id)
    }
}

