import { prisma } from "../../config/prisma.js";
import { LoginInput } from "../../schema/auth.schema.js";
import { logger } from "../../utils/logger.util.js";
import { otpUtils } from "../../utils/otp.util.js";
import { passwordUtils } from "../../utils/password.util.js";
import { RedisService } from "../cache/redis.service.js";
import { publishEmailJob } from "../queue/email.producer.js";

export async function LoginService(data: LoginInput) {
  try {
    const checkUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!checkUser) {
      return { code: 400, message: "Invalid Email Or Password" };
    }

    const checkPassword = await passwordUtils.verify(
      data.password,
      checkUser.password,
    );

    if (!checkPassword) {
      return { code: 400, message: "Invalid Email Or Password" };
    }

    const otp = otpUtils.generateOtp();

    await RedisService.set(`otp:${data.email}`, otp, 300);

    await publishEmailJob({
      to: data.email,
      template: "EMAIL_OTP",
      context: { name: checkUser.name, otp },
    });

    logger.success(
      `OTP generated and queued for ${data.email}`,
      "LOGIN_SERVICE",
    );

    return { code: 200, message: "OTP Verification Code Sent To Your Email" };
  } catch (err: any) {
    logger.error("Login Service Error", err, "LOGIN_SERVICE");
    return { code: 500, message: "Internal Server Error" };
  }
}
