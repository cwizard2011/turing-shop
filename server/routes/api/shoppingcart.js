import express from 'express';
import ShoppingCartController from '../../controller/ShoppingCartController';
import Authenticate from '../../middlewares/Authenticate';

const router = express.Router();

// Items endpoints
router.post('/cart', Authenticate.auth, ShoppingCartController.addItemToCart);

export default router;
