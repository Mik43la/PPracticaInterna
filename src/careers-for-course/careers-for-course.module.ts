import { Module } from '@nestjs/common';
import { CareersForCourseController } from './careers-for-course.controller';
import { CareersForCourseService } from './careers-for-course.service';

@Module({
    controllers: [CareersForCourseController],
    providers:[CareersForCourseService]
})
export class CareersForCourseModule {}
