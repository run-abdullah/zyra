import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { startEmailWorker } from "./workers/email.worker.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5003;

// Middlewares
app.use(cors());
app.use(express.json());

// Base Route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Zyra chat Service is running smoothly! 🚀" });
});

app.listen(PORT, async () => {
  console.log(`🚀 Email Microservice is running on port ${PORT}`);
  await startEmailWorker();
});
