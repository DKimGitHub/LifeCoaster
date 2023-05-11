-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Graph" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Period" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SpecificYear" ALTER COLUMN "updated_at" DROP NOT NULL;
