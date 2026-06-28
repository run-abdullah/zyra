import crypto from "crypto";

export const otpUtils = {
  generateOtp(): string {
    const otp = crypto.randomInt(100000, 1000000);
    return otp.toString();
  },
};
