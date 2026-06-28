import { Request, Response } from "express";
import { logger } from "../../utils/logger.util.js";
import { loginSchema } from "../../schema/auth.schema.js";
import { LoginService } from "../../services/auth/login.service.js";

export async function LoginController(req: Request, res: Response) {
  try {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error.issues[0].message || "Invalid Form data",
      });
    }

    const response = await LoginService(result.data);

    return res.status(response.code).json({ message: response.message });
  } catch (err: any) {
    logger.error("Login Controller Error  ", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
