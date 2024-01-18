import { config } from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import aiRouter from "./src/routes/ai.routes";

config();

const app = express();

app.use(express.json({ limit: 10000 }));
app.use(cors());
app.use(helmet());

app.use("/api/v1/health", (req: Request, res: Response) => {
  res.json({
    status: "success",
    message: "server is healthy",
  });
});

app.use("/api/v1/ai", aiRouter);
export default app;
