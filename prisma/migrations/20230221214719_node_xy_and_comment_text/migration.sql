/*
  Warnings:

  - You are about to drop the column `xValue` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the column `yValue` on the `Node` table. All the data in the column will be lost.
  - Added the required column `text` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Graph` table without a default value. This is not possible if the table is not empty.
  - Added the required column `x` to the `Node` table without a default value. This is not possible if the table is not empty.
  - Added the required column `y` to the `Node` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "text" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Graph" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Node" DROP COLUMN "xValue",
DROP COLUMN "yValue",
ADD COLUMN     "x" INTEGER NOT NULL,
ADD COLUMN     "y" INTEGER NOT NULL,
ALTER COLUMN "title" DROP NOT NULL;
