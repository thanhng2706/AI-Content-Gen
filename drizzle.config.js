import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.tsx",
  out: "./drizzle",
  dbCredentials: {
    url:'postgresql://neondb_owner:M1kSJZd7gsBo@ep-crimson-tree-a8y4xakc.eastus2.azure.neon.tech/AI-Content-Generator?sslmode=require'
}});
