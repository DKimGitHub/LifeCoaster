/*
  Warnings:

  - You are about to drop the column `isYear` on the `Graph` table. All the data in the column will be lost.
  - Added the required column `dummy` to the `Graph` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Graph` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Graph" DROP COLUMN "isYear",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dummy" BOOLEAN NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "nextYear" INTEGER NOT NULL,
    "type" TEXT,
    "graphId" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Period" (
    "id" TEXT NOT NULL,
    "value" INTEGER,
    "description" TEXT,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "Period_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpecificYear" (
    "id" TEXT NOT NULL,
    "year" INTEGER,
    "value" INTEGER,
    "description" TEXT,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "SpecificYear_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Period_eventId_key" ON "Period"("eventId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_graphId_fkey" FOREIGN KEY ("graphId") REFERENCES "Graph"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Period" ADD CONSTRAINT "Period_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecificYear" ADD CONSTRAINT "SpecificYear_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
