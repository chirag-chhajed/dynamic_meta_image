import Redis from 'ioredis';
import dotenv from 'dotenv'
dotenv.config()
 
const redisConnect = new Redis(process.env.REDIS_URL);
 
export {redisConnect}