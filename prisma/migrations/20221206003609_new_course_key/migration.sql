/*
  Warnings:

  - The primary key for the `courses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `courseStartTerm` to the `careers_for_course` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "careers_for_course" DROP CONSTRAINT "careers_for_course_courseLecturer_courseSchedule_courseSea_fkey";

-- AlterTable
ALTER TABLE "careers_for_course" ADD COLUMN     "courseStartTerm" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "courses" DROP CONSTRAINT "courses_pkey",
ADD CONSTRAINT "courses_pkey" PRIMARY KEY ("lecturer", "schedule", "startTerm", "seasonName");

-- AddForeignKey
ALTER TABLE "careers_for_course" ADD CONSTRAINT "careers_for_course_courseLecturer_courseSchedule_courseSta_fkey" FOREIGN KEY ("courseLecturer", "courseSchedule", "courseStartTerm", "courseSeason") REFERENCES "courses"("lecturer", "schedule", "startTerm", "seasonName") ON DELETE RESTRICT ON UPDATE CASCADE;
