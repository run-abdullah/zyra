// src/templates/index.ts
import { getOtpTemplate } from "./otp.template.js";

export type TemplateType =
  "EMAIL_OTP" | "EMAIL_PASSWORD_CHANGE" | "EMAIL_SIGNUP";

export const getTemplateHtml = (
  template: TemplateType,
  data: any,
): { subject: string; html: string } => {
  switch (template) {
    case "EMAIL_OTP":
      return {
        subject: "Zyra App - Your OTP Verification Code",
        html: getOtpTemplate(data.name, data.otp),
      };
    case "EMAIL_PASSWORD_CHANGE":
      return {
        subject: "Security Alert - Password Changed",
        html: `<h1>Password Changed Successfully</h1><p>Hey ${data.name}, your password was updated.</p>`,
      };
    case "EMAIL_SIGNUP":
      return {
        subject: "Welcome to Zyra!",
        html: `<h1>Welcome ${data.name}!</h1><p>Thanks for joining us.</p>`,
      };
    default:
      throw new Error("Invalid Template Type Provided");
  }
};
