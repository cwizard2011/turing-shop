import express from 'express';
import users from './users';
import items from './products';

const router = express.Router();

router.use('/', users);
router.use('/', items);


export default router;
