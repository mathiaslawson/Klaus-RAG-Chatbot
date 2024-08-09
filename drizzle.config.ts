import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db_drizzle/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["klaus_embedded"],
} satisfies Config;