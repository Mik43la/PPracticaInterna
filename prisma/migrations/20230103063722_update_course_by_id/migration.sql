/*
  Warnings:

  - The primary key for the `careers_for_course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `courseLecturer` on the `careers_for_course` table. All the data in the column will be lost.
  - You are about to drop the column `courseSchedule` on the `careers_for_course` table. All the data in the column will be lost.
  - You are about to drop the column `courseSeason` on the `careers_for_course` table. All the data in the column will be lost.
  - You are about to drop the column `courseStartTerm` on the `careers_for_course` table. All the data in the column will be lost.
  - The primary key for the `courses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `student_courses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `courseLecturer` on the `student_courses` table. All the data in the column will be lost.
  - You are about to drop the column `courseSchedule` on the `student_courses` table. All the data in the column will be lost.
  - You are about to drop the column `courseSeason` on the `student_courses` table. All the data in the column will be lost.
  - You are about to drop the column `courseStartTerm` on the `student_courses` table. All the data in the column will be lost.
  - Added the required column `courseId` to the `careers_for_course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseId` to the `student_courses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "careers_for_course" DROP CONSTRAINT "careers_for_course_courseLecturer_courseSchedule_courseSta_fkey";

-- DropForeignKey
ALTER TABLE "student_courses" DROP CONSTRAINT "student_courses_courseLecturer_courseSchedule_courseStartT_fkey";

-- AlterTable
ALTER TABLE "careers_for_course" DROP CONSTRAINT "careers_for_course_pkey",
DROP COLUMN "courseLecturer",
DROP COLUMN "courseSchedule",
DROP COLUMN "courseSeason",
DROP COLUMN "courseStartTerm",
ADD COLUMN     "courseId" INTEGER NOT NULL,
ADD CONSTRAINT "careers_for_course_pkey" PRIMARY KEY ("courseId", "careerId");

-- AlterTable
ALTER TABLE "courses" DROP CONSTRAINT "courses_pkey",
ADD CONSTRAINT "courses_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "student_courses" DROP CONSTRAINT "student_courses_pkey",
DROP COLUMN "courseLecturer",
DROP COLUMN "courseSchedule",
DROP COLUMN "courseSeason",
DROP COLUMN "courseStartTerm",
ADD COLUMN     "courseId" INTEGER NOT NULL,
ADD CONSTRAINT "student_courses_pkey" PRIMARY KEY ("studentCode", "courseId");

-- AddForeignKey
ALTER TABLE "careers_for_course" ADD CONSTRAINT "careers_for_course_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_courses" ADD CONSTRAINT "student_courses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
