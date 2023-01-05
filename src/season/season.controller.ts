import { Controller, Delete, Put, Get, Param, Post, Body, UseGuards } from "@nestjs/common";
import { SeasonDto } from "./dto";
import { SeasonService } from "./season.service";
import { JwtGuard } from "src/auth/guard";
import { Roles } from "src/role/decorators/role.decorator";
import { RoleGuard } from "src/role/guards/role.guard";


@Controller('season')
@UseGuards(JwtGuard, RoleGuard)
export class SeasonController{
    constructor(private seasonService: SeasonService){}

    @Roles('admin')
    @Post('add')
    create(@Body() dto:SeasonDto) {
        return this.seasonService.create(dto)
    }

    @Roles('admin')
    @Put('update/:id') 
    update(@Param('id') id:string, @Body() dto:SeasonDto){
        return this.seasonService.update(id, dto)
    }

    @Get()
    @Roles('admin', 'jefe')
    findAll() {
        return this.seasonService.findAll()
    }

    @Roles('admin', 'jefe')
    @Get(':id')
    find(@Param('id') id) {
        return this.seasonService.find(id)
    }

    @Roles('admin')
    @Delete(':id')
    delete(@Param('id') id) {
        return this.seasonService.delete(id)
    }
}