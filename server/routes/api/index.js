import express from 'express';
import users from './users';
import items from './products';
import carts from './shoppingcart';

const router = express.Router();

router.use('/', users);
router.use('/', items);
router.use('/', carts);


export default router;
