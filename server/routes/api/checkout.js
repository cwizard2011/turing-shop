import express from 'express';
import CheckoutController from '../../controller/CheckoutController';
import Authenticate from '../../middlewares/Authenticate';

const router = express.Router();

// Items endpoints
router.post(
  '/checkout',
  Authenticate.auth,
  CheckoutController.checkout
);

router.get(
  '/region',
  Authenticate.auth,
  CheckoutController.getShippingRegion
);

export default router;
