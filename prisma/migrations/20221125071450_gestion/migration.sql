/*
  Warnings:

  - You are about to drop the column `careerId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `personalData` on the `User` table. All the data in the column will be lost.
  - Added the required column `seasonId` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "careerId",
ADD COLUMN     "seasonId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "personalData";

-- CreateTable
CREATE TABLE "Season" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Season_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
