import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common/decorators";
import { JwtGuard } from "src/auth/guard";
import { Roles } from "src/role/decorators/role.decorator";
import { RoleGuard } from "src/role/guards/role.guard";
import { CareerOfUserService } from "./career-of-user.service";
import { CareerOfUserDto } from "./dto";


@UseGuards(JwtGuard, RoleGuard)
@Controller('user-career')
export class CareerOfUserController{
    constructor(private careerOfUserService:CareerOfUserService){}


    @Roles('admin', 'jefe')
    @Post('add')
    create(@Body() dto:CareerOfUserDto){
        return this.careerOfUserService.create(dto)
    }

    @Roles('admin', 'jefe')
    @Put('update/:code/:career')
    update(@Param('code') code, @Param('career') career, @Body() dto:CareerOfUserDto){
        return this.careerOfUserService.update(code, career, dto)
    }

    @Roles('admin', 'jefe')
    @Get()
    findAll() {
        return this.careerOfUserService.findAll()
    }

    @Roles('admin', 'jefe')
    @Get('code/:code')
    findByCode(@Param('code') code) {
        return this.careerOfUserService.findByCode(code)
    }

    @Roles('admin', 'jefe')
    @Get('career/:career')
    findByCareer(@Param('career') career) {
        return this.careerOfUserService.findByCareer(career)
    }

    @Roles('admin', 'jefe')
    @Delete(':code/:career')
    delete(@Param('code') code, @Param('career') career) {
        return this.careerOfUserService.delete(code, career)
    }

}