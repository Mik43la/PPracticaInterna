-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_careerId_fkey";

-- CreateTable
CREATE TABLE "CareersForCourse" (
    "courseId" INTEGER NOT NULL,
    "careerId" INTEGER NOT NULL,

    CONSTRAINT "CareersForCourse_pkey" PRIMARY KEY ("courseId","careerId")
);

-- AddForeignKey
ALTER TABLE "CareersForCourse" ADD CONSTRAINT "CareersForCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CareersForCourse" ADD CONSTRAINT "CareersForCourse_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "Career"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
