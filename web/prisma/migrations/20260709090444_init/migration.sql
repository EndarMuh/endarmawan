-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "initials" TEXT NOT NULL DEFAULT 'MED',
    "photoUrl" TEXT,
    "cvUrl" TEXT,
    "cvUrlId" TEXT,
    "roles" TEXT NOT NULL,
    "eyebrow" TEXT NOT NULL,
    "intro" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "availability" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "linkedin" TEXT NOT NULL,
    "github" TEXT,
    "gitlab" TEXT,
    "showPhone" BOOLEAN NOT NULL DEFAULT true,
    "aboutParas" TEXT NOT NULL,
    "facts" TEXT NOT NULL,
    "stats" TEXT NOT NULL,
    "contactH" TEXT NOT NULL,
    "contactP" TEXT NOT NULL,
    "openTo" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" TEXT NOT NULL,
    "org" TEXT NOT NULL,
    "loc" TEXT NOT NULL,
    "current" BOOLEAN NOT NULL DEFAULT false,
    "role" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "bullets" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "imageUrl" TEXT,
    "link" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillGroup" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "items" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "SkillGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" TEXT NOT NULL,
    "school" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "org" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "bullets" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certificate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sub" TEXT NOT NULL,
    "fileUrl" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
