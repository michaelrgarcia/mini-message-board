import pool from "./pool.js";

export async function getMessageById(msgIndex: number) {
  const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [
    msgIndex,
  ]);

  return rows[0];
}

export async function getMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");

  return rows;
}

export async function insertMessage(
  username: string,
  message: string,
  dateAdded: Date
) {
  await pool.query(
    "INSERT INTO messages (username, text, added) VALUES ($1, $2, $3)",
    [username, message, dateAdded.toISOString()]
  );
}
