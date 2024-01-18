import { config } from "dotenv";
import app from "./app";

config();

async function initServer() {
  const PORT = parseInt(process.env.PORT!);

  app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
  });
}

initServer();
