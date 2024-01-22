import { config } from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import aiRouter from "./src/routes/ai.routes";
import authRouter from "./src/routes/auth.routes";
import chatRouter from "./src/routes/chat.routes";

config();

const app = express();

app.use(express.json({ limit: 10000 }));
app.use(
  cors({
    origin: "*",
  })
);
app.use(helmet());

app.use("/api/v1/health", (req: Request, res: Response) => {
  res.json({
    status: "success",
    message: "server is healthy",
  });
});

app.use("/api/v1/ai", aiRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/chats", chatRouter);
export default app;
