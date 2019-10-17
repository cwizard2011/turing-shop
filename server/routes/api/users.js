import express from 'express';
import UserInputValidation from '../../middlewares/validations/CustomerProfileValidation';
import AuthController from '../../controller/AuthController';
import Authenticate from '../../middlewares/Authenticate';
import CustomerProfileController from '../../controller/CustomerProfileController';

const router = express.Router();

router.get('/', (req, res) => res.status(404).json({
  message: 'Welcome to Shopmate API'
}));

// Auth endpoints
router.post('/customers', UserInputValidation.signUpInputValidation, AuthController.createCustomer);
router.get('/customer', Authenticate.auth, CustomerProfileController.getUserProfile);
router.post('/customer/login', UserInputValidation.loginInputValidation, AuthController.loginCustomer);
router.put(
  '/customer',
  Authenticate.auth,
  CustomerProfileController.updateProfile
);

export default router;
