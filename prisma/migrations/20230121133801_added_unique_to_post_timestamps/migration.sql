/*
  Warnings:

  - A unique constraint covering the columns `[created_at]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[updated_at]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Post_created_at_key" ON "Post"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "Post_updated_at_key" ON "Post"("updated_at");
