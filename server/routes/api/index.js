import express from 'express';
import users from './users';
import items from './products';
import carts from './shoppingcart';
import checkout from './checkout';
import countries from './getCountries';

const router = express.Router();

router.use('/', users);
router.use('/', items);
router.use('/', carts);
router.use('/', checkout);
router.use('/', countries);


export default router;
