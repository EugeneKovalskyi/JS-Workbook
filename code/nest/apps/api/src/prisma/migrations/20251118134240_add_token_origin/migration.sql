/*
  Warnings:

  - Added the required column `origin` to the `refresh_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_refresh_tokens" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "device_id" INTEGER NOT NULL,
    CONSTRAINT "refresh_tokens_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "devices" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_refresh_tokens" ("device_id", "id", "value") SELECT "device_id", "id", "value" FROM "refresh_tokens";
DROP TABLE "refresh_tokens";
ALTER TABLE "new_refresh_tokens" RENAME TO "refresh_tokens";
CREATE UNIQUE INDEX "refresh_tokens_value_key" ON "refresh_tokens"("value");
CREATE UNIQUE INDEX "refresh_tokens_device_id_key" ON "refresh_tokens"("device_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
