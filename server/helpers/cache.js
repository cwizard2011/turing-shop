import redis from 'redis';
import dotenv from 'dotenv';

dotenv.config();

let client;

if (process.env.NODE_ENV === 'production') {
  client = redis.createClient(process.env.REDIS_URL);
} else {
  client = redis.createClient();
}

const redisMiddleware = (req, res, next) => {
  const key = `__expIress__${req.originalUrl}` || req.url;
  client.get(key, (err, reply) => {
    if (reply) {
      res.send(JSON.parse(reply));
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        client.set(key, JSON.stringify(body));
        res.sendResponse(body);
      };
      next();
    }
  });
};

export default redisMiddleware;
