-- CreateTable
CREATE TABLE "user" (
    "uuid" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("uuid")
);
