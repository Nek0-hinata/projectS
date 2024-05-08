-- CreateTable
CREATE TABLE "tagLink" (
    "id" SERIAL NOT NULL,
    "tagId" INTEGER NOT NULL,
    "linkedTagId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tagLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tagLink_tagId_linkedTagId_key" ON "tagLink"("tagId", "linkedTagId");

-- AddForeignKey
ALTER TABLE "tagLink" ADD CONSTRAINT "tagLink_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tagLink" ADD CONSTRAINT "tagLink_linkedTagId_fkey" FOREIGN KEY ("linkedTagId") REFERENCES "tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
