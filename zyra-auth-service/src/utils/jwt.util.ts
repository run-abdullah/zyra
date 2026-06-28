// src/utils/jwt.util.ts
import jwt, { SignOptions } from "jsonwebtoken";

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "access_secret_key_123";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "refresh_secret_key_456";

const ACCESS_TOKEN_EXPIRY = (process.env.ACCESS_TOKEN_EXPIRY ||
  "15m") as SignOptions["expiresIn"];
const REFRESH_TOKEN_EXPIRY = (process.env.REFRESH_TOKEN_EXPIRY ||
  "7d") as SignOptions["expiresIn"];

export const jwtUtils = {
  generateAccessToken(payload: object): string {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    });
  },

  verifyAccessToken<T>(token: string): T | null {
    try {
      return jwt.verify(token, ACCESS_TOKEN_SECRET) as T;
    } catch {
      return null;
    }
  },

  generateRefreshToken(payload: object): string {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    });
  },

  verifyRefreshToken<T>(token: string): T | null {
    try {
      return jwt.verify(token, REFRESH_TOKEN_SECRET) as T;
    } catch {
      return null;
    }
  },
};
