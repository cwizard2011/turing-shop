import express from 'express';
import getCountries from '../../helpers/getCountries';
import Authenticate from '../../middlewares/Authenticate';
import redisMiddleware from '../../helpers/cache';

const router = express.Router();

router.get(
  '/countries',
  Authenticate.auth,
  redisMiddleware,
  getCountries
);

export default router;
