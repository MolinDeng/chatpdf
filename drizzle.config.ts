import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
// dotenv.config({ path: ".env" });
dotenv.config();

export default {
  schema: './lib/db/schema.ts',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;

// npx drizzle-kit push:pg
