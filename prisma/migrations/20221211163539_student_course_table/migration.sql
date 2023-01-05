/*
  Warnings:

  - The primary key for the `careers_for_course` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "careers_for_course" DROP CONSTRAINT "careers_for_course_pkey",
ADD CONSTRAINT "careers_for_course_pkey" PRIMARY KEY ("courseLecturer", "courseSchedule", "courseStartTerm", "courseSeason", "careerId");

-- CreateTable
CREATE TABLE "StudentCourses" (
    "studentCode" TEXT NOT NULL,
    "courseLecturer" TEXT NOT NULL,
    "courseSchedule" TEXT NOT NULL,
    "courseSeason" TEXT NOT NULL,
    "courseStartTerm" INTEGER NOT NULL,

    CONSTRAINT "StudentCourses_pkey" PRIMARY KEY ("studentCode","courseLecturer","courseSchedule","courseStartTerm","courseSeason")
);

-- AddForeignKey
ALTER TABLE "StudentCourses" ADD CONSTRAINT "StudentCourses_courseLecturer_courseSchedule_courseStartTe_fkey" FOREIGN KEY ("courseLecturer", "courseSchedule", "courseStartTerm", "courseSeason") REFERENCES "courses"("lecturer", "schedule", "startTerm", "seasonName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCourses" ADD CONSTRAINT "StudentCourses_studentCode_fkey" FOREIGN KEY ("studentCode") REFERENCES "users"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
