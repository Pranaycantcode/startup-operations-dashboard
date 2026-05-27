import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // This tells Prisma Migrate where your SQLite database is
    url: env("DATABASE_URL"), 
  },
});