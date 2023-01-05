-- DropForeignKey
ALTER TABLE "StudentCourses" DROP CONSTRAINT "StudentCourses_courseLecturer_courseSchedule_courseStartTe_fkey";

-- DropForeignKey
ALTER TABLE "careers_for_course" DROP CONSTRAINT "careers_for_course_careerId_fkey";

-- DropForeignKey
ALTER TABLE "careers_for_course" DROP CONSTRAINT "careers_for_course_courseLecturer_courseSchedule_courseSta_fkey";

-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_seasonName_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_rolename_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "rolename" SET DEFAULT 'user';

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_rolename_fkey" FOREIGN KEY ("rolename") REFERENCES "roles"("name") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_seasonName_fkey" FOREIGN KEY ("seasonName") REFERENCES "seasons"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "careers_for_course" ADD CONSTRAINT "careers_for_course_courseLecturer_courseSchedule_courseSta_fkey" FOREIGN KEY ("courseLecturer", "courseSchedule", "courseStartTerm", "courseSeason") REFERENCES "courses"("lecturer", "schedule", "startTerm", "seasonName") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "careers_for_course" ADD CONSTRAINT "careers_for_course_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "careers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCourses" ADD CONSTRAINT "StudentCourses_courseLecturer_courseSchedule_courseStartTe_fkey" FOREIGN KEY ("courseLecturer", "courseSchedule", "courseStartTerm", "courseSeason") REFERENCES "courses"("lecturer", "schedule", "startTerm", "seasonName") ON DELETE CASCADE ON UPDATE CASCADE;
