import express from 'express';
import ProductController from '../../controller/ProductController';
import QueryValidation from '../../middlewares/validations/QueryValidation';

const router = express.Router();

// Items endpoints
router.get('/products',
  QueryValidation.queryValidation,
  ProductController.getAllProducts);
router.get('/product/:product_id', ProductController.getSingleProduct);
router.get('/department', ProductController.getAllDepartments);
router.get('/featured', ProductController.getFeaturedProduct);

export default router;
