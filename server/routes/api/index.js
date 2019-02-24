import express from 'express';
import users from './users';
import items from './products';
import carts from './shoppingcart';
import checkout from './checkout';

const router = express.Router();

router.use('/', users);
router.use('/', items);
router.use('/', carts);
router.use('/', checkout);


export default router;
