import express from 'express';
import ShoppingCartController from '../../controller/ShoppingCartController';
import ShoppingCartValidation from '../../middlewares/validations/ShoppingCartValidation';
import Authenticate from '../../middlewares/Authenticate';

const router = express.Router();

// Items endpoints
router.post(
  '/cart',
  Authenticate.auth,
  ShoppingCartValidation.validateCartInput,
  ShoppingCartValidation.checkCartItem,
  ShoppingCartController.addItemToCart
);
router.put(
  '/cart/:cartId',
  Authenticate.auth,
  ShoppingCartValidation.validateCartUpdate,
  ShoppingCartController.updateCartItem
);
router.get('/cart', Authenticate.auth, ShoppingCartController.getAllCartItems);
router.delete('/cart/:cartId', Authenticate.auth, ShoppingCartController.deleteCartItem);

export default router;
