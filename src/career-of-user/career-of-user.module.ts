import { Module } from '@nestjs/common';
import { CareerOfUserController } from './career-of-user.controller';
import { CareerOfUserService } from './career-of-user.service';

@Module({
    controllers:[CareerOfUserController],
    providers:[CareerOfUserService]
})
export class CareerOfUserModule {}
