import { pool } from "../server";

export async function initUserTable() {
  const query = `
    create table if not exists users(
      id UUID PRIMARY KEY,
      email text UNIQUE NOT NULL,
      username text UNIQUE NOT NULL,
      password text NOT NULL,
      ip text  NOT NULL
    )
    `;

  const client = await pool.connect();
  await client.query(query);
  client.release();

  console.log("user table created!");
}
