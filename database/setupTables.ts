import fs from 'fs';
import path from 'path';
import { pool } from './database';
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export const setupTables = async () => {
  let connection;
  try {
    connection = await pool.getConnection();

    const databaseName = 'youtube_clone_db'; // Your desired database name
    const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${databaseName}`;

    await connection.query(createDatabaseQuery);
    console.log(`✅ Database "${databaseName}" is ready!`);

    const useDatabaseQuery = `USE ${databaseName}`;
    await connection.query(useDatabaseQuery);
    console.log(`✅ Using database "${databaseName}"`);

    const sqlFilePath = path.join(__dirname, 'table_setup.sql');
    const sqlQuery = fs.readFileSync(sqlFilePath, 'utf8');

    await connection.query(sqlQuery);
    console.log(`✅ Tables created successfully in database "${databaseName}"!`);

  } catch (err) {
    console.log('❌ Error setting up database and tables:', err);
  } finally {
    if (connection) connection.release();
  }


};
