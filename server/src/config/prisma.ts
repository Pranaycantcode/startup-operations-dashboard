// src/config/prisma.ts
import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql"; 
import dotenv from "dotenv";

dotenv.config();

// In Prisma 7, you pass the configuration config directly into the adapter!
const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL || "file:./dev.db",
});

export const prisma = new PrismaClient({ adapter });