import express from 'express';
import getCountries from '../../helpers/getCountries';
import Authenticate from '../../middlewares/Authenticate';

const router = express.Router();

router.get(
  '/countries',
  Authenticate.auth,
  getCountries
);

export default router;
