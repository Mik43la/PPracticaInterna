/*
  Warnings:

  - You are about to drop the `Career` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CareersForCourse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Season` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Career" DROP CONSTRAINT "Career_facultyHeadId_fkey";

-- DropForeignKey
ALTER TABLE "CareersForCourse" DROP CONSTRAINT "CareersForCourse_careerId_fkey";

-- DropForeignKey
ALTER TABLE "CareersForCourse" DROP CONSTRAINT "CareersForCourse_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_seasonId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_roleId_fkey";

-- DropTable
DROP TABLE "Career";

-- DropTable
DROP TABLE "CareersForCourse";

-- DropTable
DROP TABLE "Course";

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "Season";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rolename" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "careers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "facultyHeadUsername" TEXT NOT NULL,

    CONSTRAINT "careers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "startTerm" INTEGER NOT NULL,
    "endTerm" INTEGER NOT NULL,
    "schedule" TEXT NOT NULL,
    "lecturer" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "ownerUsername" TEXT NOT NULL,
    "seasonId" INTEGER NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("lecturer","schedule")
);

-- CreateTable
CREATE TABLE "careers_for_course" (
    "courseLecturer" TEXT NOT NULL,
    "courseSchedule" TEXT NOT NULL,
    "careerId" INTEGER NOT NULL,

    CONSTRAINT "careers_for_course_pkey" PRIMARY KEY ("courseLecturer","courseSchedule","careerId")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "seasons" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "seasons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_code_key" ON "users"("code");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_rolename_fkey" FOREIGN KEY ("rolename") REFERENCES "roles"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "careers" ADD CONSTRAINT "careers_facultyHeadUsername_fkey" FOREIGN KEY ("facultyHeadUsername") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_ownerUsername_fkey" FOREIGN KEY ("ownerUsername") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "seasons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "careers_for_course" ADD CONSTRAINT "careers_for_course_courseLecturer_courseSchedule_fkey" FOREIGN KEY ("courseLecturer", "courseSchedule") REFERENCES "courses"("lecturer", "schedule") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "careers_for_course" ADD CONSTRAINT "careers_for_course_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "careers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
