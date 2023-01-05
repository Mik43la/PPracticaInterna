/*
  Warnings:

  - The `career` column on the `career_of_user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "career_of_user" DROP CONSTRAINT "career_of_user_career_fkey";

-- AlterTable
ALTER TABLE "career_of_user" DROP COLUMN "career",
ADD COLUMN     "career" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "career_of_user" ADD CONSTRAINT "career_of_user_career_fkey" FOREIGN KEY ("career") REFERENCES "careers"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;
