import { config } from "dotenv";
import { Pool } from "pg";
import app from "./app";
import { initUserTable } from "./db/user";

config();

export const pool =
  process.env.NODE_ENV !== "production"
    ? new Pool({
        password: process.env.DEV_DB_PASS!,
        port: parseInt(process.env.DEV_DB_PORT!),
        user: process.env.DEV_DB_USER!,
        host: "localhost",
      })
    : new Pool({
        connectionString: process.env.DB_URL!,
      });

async function initServer() {
  const PORT = parseInt(process.env.PORT!);

  app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
  });

  pool.on("error", (err, client) => {
    console.error("Unexpected db error ", err);
    process.exit(-1);
  });

  await initUserTable();
}

initServer();
