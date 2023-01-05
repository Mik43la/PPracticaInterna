/*
  Warnings:

  - You are about to drop the `StudentCourses` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `careers` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "StudentCourses" DROP CONSTRAINT "StudentCourses_courseLecturer_courseSchedule_courseStartTe_fkey";

-- DropForeignKey
ALTER TABLE "StudentCourses" DROP CONSTRAINT "StudentCourses_studentCode_fkey";

-- DropTable
DROP TABLE "StudentCourses";

-- CreateTable
CREATE TABLE "career_of_user" (
    "id" SERIAL NOT NULL,
    "career" TEXT NOT NULL DEFAULT 'Non Existent',
    "usercode" TEXT NOT NULL,

    CONSTRAINT "career_of_user_pkey" PRIMARY KEY ("usercode","career")
);

-- CreateTable
CREATE TABLE "student_courses" (
    "studentCode" TEXT NOT NULL,
    "courseLecturer" TEXT NOT NULL,
    "courseSchedule" TEXT NOT NULL,
    "courseSeason" TEXT NOT NULL,
    "courseStartTerm" INTEGER NOT NULL,

    CONSTRAINT "student_courses_pkey" PRIMARY KEY ("studentCode","courseLecturer","courseSchedule","courseStartTerm","courseSeason")
);

-- CreateIndex
CREATE UNIQUE INDEX "career_of_user_usercode_key" ON "career_of_user"("usercode");

-- CreateIndex
CREATE UNIQUE INDEX "careers_name_key" ON "careers"("name");

-- AddForeignKey
ALTER TABLE "career_of_user" ADD CONSTRAINT "career_of_user_career_fkey" FOREIGN KEY ("career") REFERENCES "careers"("name") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "career_of_user" ADD CONSTRAINT "career_of_user_usercode_fkey" FOREIGN KEY ("usercode") REFERENCES "users"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_courses" ADD CONSTRAINT "student_courses_courseLecturer_courseSchedule_courseStartT_fkey" FOREIGN KEY ("courseLecturer", "courseSchedule", "courseStartTerm", "courseSeason") REFERENCES "courses"("lecturer", "schedule", "startTerm", "seasonName") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_courses" ADD CONSTRAINT "student_courses_studentCode_fkey" FOREIGN KEY ("studentCode") REFERENCES "users"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
