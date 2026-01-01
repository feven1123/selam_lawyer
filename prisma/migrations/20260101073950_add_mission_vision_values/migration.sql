-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "ContactMessage" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "PracticeArea" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "SiteSettings" ADD COLUMN     "mission" TEXT,
ADD COLUMN     "values" TEXT,
ADD COLUMN     "vision" TEXT,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);
