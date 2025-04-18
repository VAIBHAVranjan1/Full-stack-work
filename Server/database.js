import mysql from "mysql2";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

export const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();


export async function getAllEntries() {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows;
}

export async function getEntry(email) {
  const [rows] = await pool.query(
    "SELECT * FROM users WHERE email = ? LIMIT 1",
    [email],
  );
  return rows.length > 0 ? rows[0] : null;
}

export async function whetherUserExists(email) {
  const [rows] = await pool.query(
    "SELECT 1 FROM users WHERE email = ? LIMIT 1",
    [email],
  );
  return rows.length > 0;
}

export async function addEntry(email, user_name, password, img) {
  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query(
    "INSERT INTO users (email, user_name, password, img) VALUES (?, ?, ?, ?)",
    [email, user_name, hashedPassword, img],
  );
  return "User added successfully";
}
