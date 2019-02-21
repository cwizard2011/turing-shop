import express from 'express';
import UserInputValidation from '../../middlewares/validations/AuthValidation';
import AuthController from '../../controller/AuthController';

const router = express.Router();

router.get('/', (req, res) => res.status(404).json({
  message: 'Welcome to Turing E-commerce web app'
}));

// Auth endpoints
router.post('/users', UserInputValidation.signUpInputValidation, AuthController.createCustomer);
router.post('/users/login', UserInputValidation.loginInputValidation, AuthController.loginCustomer);

export default router;
