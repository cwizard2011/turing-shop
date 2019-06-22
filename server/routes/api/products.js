import express from 'express';
import ProductController from '../../controller/ProductController';
import QueryValidation from '../../middlewares/validations/QueryValidation';

const router = express.Router();

// Items endpoints
router.get('/items',
  QueryValidation.queryValidation,
  ProductController.getAllItems);
router.get('/items/:id', ProductController.getSingleItem);
router.get('/department', ProductController.getAllDepartments);
router.get('/featured', ProductController.getFeaturedProduct);

export default router;
