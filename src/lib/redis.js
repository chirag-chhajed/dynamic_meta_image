import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

const redisConnect = new Redis(
  `redis://default:${process.env.REDIS_PASSWORD}@pumped-heron-45030.upstash.io:45030`
);
// await client.set("foo", "bar");

export { redisConnect };
