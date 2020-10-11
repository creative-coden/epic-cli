module.exports = function () {
  return `import redis from 'redis';
  import { promisify } from 'util';
  
  export async function getCacheHandler(ctx, next) {
    const redisClient = redis.createClient(process.env.REDIS_URL);
    const getAsync = promisify(redisClient.get).bind(redisClient);
    const key = ctx.url;
    try {
      const data = await getAsync(key);
      if (!data) {
        next();
      }
      return JSON.parse(data);
    } catch (error) {
      console.log('error', error);
    }
  }
  
  export async function updateCacheHandler(ctx, next) {
    const redisClient = redis.createClient(process.env.REDIS_URL);
    const setAsync = promisify(redisClient.setex).bind(redisClient);
    const key = ctx.url;
    try {
      //query database
      await setAsync(key, 3600, JSON.stringify(result));
    } catch (error) {
      console.log('error', error);
    }
  }
  `
}

