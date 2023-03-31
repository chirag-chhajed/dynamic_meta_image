import Redis from 'ioredis';
import dotenv from 'dotenv'
dotenv.config()
 
// const redisConnect = new Redis(process.env.REDIS_URL);
const redisConnect = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});
 
export {redisConnect}