import express from 'express';
import ProductController from '../../controller/ProductController';
import QueryValidation from '../../middlewares/validations/QueryValidation';
import redisMiddleware from '../../helpers/cache';

const router = express.Router();

// Items endpoints
router.get('/items',
  QueryValidation.queryValidation,
  redisMiddleware,
  ProductController.getAllItems);
router.get('/items/:id', redisMiddleware, ProductController.getSingleItem);
router.get('/department', redisMiddleware, ProductController.getAllDepartments);
router.get('/featured', ProductController.getFeaturedProduct);

export default router;
