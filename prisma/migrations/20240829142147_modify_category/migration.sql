/*
  Warnings:

  - You are about to drop the column `code` on the `Category` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Category_code_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "code";

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");
