-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "initials" TEXT NOT NULL DEFAULT 'MED',
    "photoUrl" TEXT,
    "cvUrl" TEXT,
    "roles" TEXT NOT NULL,
    "eyebrow" TEXT NOT NULL,
    "intro" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "availability" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "linkedin" TEXT NOT NULL,
    "showPhone" BOOLEAN NOT NULL DEFAULT true,
    "aboutParas" TEXT NOT NULL,
    "facts" TEXT NOT NULL,
    "stats" TEXT NOT NULL,
    "contactH" TEXT NOT NULL,
    "contactP" TEXT NOT NULL,
    "openTo" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "org" TEXT NOT NULL,
    "loc" TEXT NOT NULL,
    "current" BOOLEAN NOT NULL DEFAULT false,
    "role" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "bullets" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "imageUrl" TEXT,
    "link" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "SkillGroup" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "items" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Education" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "school" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "org" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "bullets" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Certificate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "sub" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
