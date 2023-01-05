/*
  Warnings:

  - The primary key for the `courses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `seasonId` on the `courses` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `seasons` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `courseSeason` to the `careers_for_course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seasonName` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "careers_for_course" DROP CONSTRAINT "careers_for_course_courseLecturer_courseSchedule_fkey";

-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_seasonId_fkey";

-- AlterTable
ALTER TABLE "careers_for_course" ADD COLUMN     "courseSeason" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "courses" DROP CONSTRAINT "courses_pkey",
DROP COLUMN "seasonId",
ADD COLUMN     "seasonName" TEXT NOT NULL,
ADD CONSTRAINT "courses_pkey" PRIMARY KEY ("lecturer", "schedule", "seasonName");

-- CreateIndex
CREATE UNIQUE INDEX "seasons_name_key" ON "seasons"("name");

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_seasonName_fkey" FOREIGN KEY ("seasonName") REFERENCES "seasons"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "careers_for_course" ADD CONSTRAINT "careers_for_course_courseLecturer_courseSchedule_courseSea_fkey" FOREIGN KEY ("courseLecturer", "courseSchedule", "courseSeason") REFERENCES "courses"("lecturer", "schedule", "seasonName") ON DELETE RESTRICT ON UPDATE CASCADE;
