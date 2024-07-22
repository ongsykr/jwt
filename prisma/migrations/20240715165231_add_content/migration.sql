-- CreateTable
CREATE TABLE "Content" (
    "uuid" UUID NOT NULL,
    "body" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("uuid")
);
