import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { publishEmailJob } from "./services/queue/email.producer.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors());
app.use(express.json());

// Base Route
app.get("/", async (req: Request, res: Response) => {
  await publishEmailJob({
    to: "ar9642308@gmail.com",
    template: "EMAIL_OTP",
    context: {
      name: "Abdullah",
      otp: "5821",
    },
  });

  res.send("email send");
});

// Server Start
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
