/*
  Warnings:

  - The primary key for the `career_of_user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "career_of_user" DROP CONSTRAINT "career_of_user_pkey",
ALTER COLUMN "career" SET DEFAULT 'None',
ADD CONSTRAINT "career_of_user_pkey" PRIMARY KEY ("usercode");
