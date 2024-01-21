import { pool } from "../server";

export async function initChatTable() {
  const query = `
    create table if not exists chats(
      id UUID PRIMARY KEY,
      sender text NOT NULL,
      recipient text NOT NULL,
      role text NOT NULL,
      message text NOT NULL,
      pos serial
    )
    `;
  const client = await pool.connect();
  await client.query(query);
  client.release();

  console.log("chat table created!");
}
