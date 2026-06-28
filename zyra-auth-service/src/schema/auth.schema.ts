import { z } from "zod";

// 🔥 Login Validation Schema
export const loginSchema = z.object({
  email: z.string({ message: "Email is required." }).trim().email({
    message: "Invalid email format. Please provide a valid email address.",
  }),

  password: z
    .string({ message: "Password is required." })
    .min(1, { message: "Password cannot be empty." }),
});

// Signup Validation Schema
export const signupSchema = z.object({
  username: z
    .string({ message: "Username is required." })
    .trim()
    .min(3, { message: "Username must be at least 3 characters." })
    .max(20, { message: "Username cannot exceed 20 characters." })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores.",
    })
    .toLowerCase(),

  email: z
    .string({ message: "Email is required." })
    .trim()
    .email({ message: "Invalid email format." }),

  password: z
    .string({ message: "Password is required." })
    .min(6, { message: "Password must be at least 6 characters long." }),
});

// OTP Validation Schema
export const verifyOtpSchema = z.object({
  email: z
    .string({ message: "Email is required." })
    .trim()
    .email({ message: "Invalid email format." }),

  otpCode: z
    .string({ message: "OTP code is required." })
    .trim()
    .length(4, { message: "OTP must be exactly 4 digits." })
    .regex(/^[0-9]+$/, { message: "OTP must contain numbers only." }),

  type: z.enum(["SIGNUP", "LOGIN"], {
    message: "Type must be either SIGNUP or LOGIN.",
  }),
});

// Recovery Validation Schema
export const recoverAccountSchema = z.object({
  email: z
    .string({ message: "Email is required." })
    .trim()
    .email({ message: "Invalid email format." }),
});

// ResetPassword Validation Schema
export const resetPasswordSchema = z.object({
  email: z
    .string({ message: "Email is required." })
    .trim()
    .email({ message: "Invalid email format." }),

  otpCode: z
    .string({ message: "OTP code is required." })
    .trim()
    .length(4, { message: "OTP must be exactly 4 digits." })
    .regex(/^[0-9]+$/, { message: "OTP must contain numbers only." }),

  newPassword: z
    .string({ message: "New password is required." })
    .min(6, { message: "New password must be at least 6 characters long." }),
});

export type RecoverAccountInput = z.infer<typeof recoverAccountSchema>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
