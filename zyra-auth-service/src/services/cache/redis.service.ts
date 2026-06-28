import { redisClient } from "../../config/redis.config.js";

export const RedisService = {
  async set(
    key: string,
    value: any,
    ttlInSeconds: number = 3600,
  ): Promise<void> {
    const stringValue =
      typeof value === "object" ? JSON.stringify(value) : String(value);
    await redisClient.set(key, stringValue, "EX", ttlInSeconds);
  },

  async get<T>(key: string): Promise<T | null> {
    const data = await redisClient.get(key);
    if (!data) return null;

    try {
      return JSON.parse(data) as T;
    } catch {
      return data as unknown as T;
    }
  },

  async delete(key: string): Promise<void> {
    await redisClient.del(key);
  },
};
