import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './course/course.module';
import { UserModule } from './user/user.module';

import { AuthModule } from './auth/auth.module';
import { CareerModule } from './career/career.module';
import { RoleModule } from './role/role.module';
import { PrismaModule } from './prisma/prisma.module';
import { SeasonModule } from './season/season.module';
import { ConfigModule } from '@nestjs/config';
import { CareersForCourseModule } from './careers-for-course/careers-for-course.module';
import { StudentCoursesModule } from './student-courses/student-courses.module';
import { CareerOfUserModule } from './career-of-user/career-of-user.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal:true  }),CourseModule, UserModule, AuthModule, CareerModule, RoleModule, PrismaModule, SeasonModule, CareersForCourseModule, StudentCoursesModule, CareerOfUserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
