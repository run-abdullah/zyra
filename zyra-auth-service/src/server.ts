import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors());
app.use(express.json());

// Base Route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Zyra Service is running smoothly! 🚀" });
});

// Server Start
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
}); 