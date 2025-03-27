-- CreateTable
CREATE TABLE "User" (
    "uname" TEXT NOT NULL,
    "uemail" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "lname" TEXT NOT NULL,
    "lemail" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uemail")
);
