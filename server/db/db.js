import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});


try {
  await db.query("SELECT 1");
  console.log("Connected to MySQL database.");
} catch (error) {
  console.error("Database connection failed:", error.message);
}




export default db;