import { pool } from './database'
import dotenv from 'dotenv'

dotenv.config();

export const createDatabase = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    const dbName = process.env.DATABASE_NAME;

    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    console.log(`✅ Database ${dbName} created or already exists`);
  } catch (err) {
    console.error('❌ Error creating database:', err);
  } finally {
    if (connection) connection.end();
  }
}
