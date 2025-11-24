import { createDatabase } from '../../database/createDatabase'
import { setupTables } from '../../database/setupTables'
import { betterAuth } from 'better-auth'
import { createPool } from 'mysql2/promise'
import dotenv from "dotenv"

dotenv.config()

const pool = createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
})

export const auth = betterAuth({
  url: process.env.APP_URL as string,
  database: pool,
  jwtSecret: process.env.JWT_SECRET as string,
  trustedOrigins: [
    process.env.APP_URL as string,
  ],
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
})

async function initDB() {
  await createDatabase()
  await setupTables()
}

initDB().catch(console.error)
