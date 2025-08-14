/* global process */

import { config } from "./config.js";
import { neon } from "@neondatabase/serverless";

const sql = neon(config.DATABASE_URL);

async function connectDB() {
  try {
    const result = await sql`SELECT version()`;
    console.log(`Connected to DB: ${result[0].version}`);
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
}

export default connectDB;
