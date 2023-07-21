import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

// const redisConnect = new Redis(process.env.REDIS_URL);
// const redisConnect = new Redis({
//   host: process.env.REDIS_HOST,
//   port: process.env.REDIS_PORT,
//   password: process.env.REDIS_PASSWORD,
// });

const redisConnect = new Redis(
  `redis://default:3c6dde1fee6848f6ac615d29bc6ee197@pumped-heron-45030.upstash.io:45030`
);
// await client.set("foo", "bar");

export { redisConnect };
