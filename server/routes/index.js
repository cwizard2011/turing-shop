import express from 'express';

import api from './api';

const router = express.Router();

router.use('/api/v2', api);

module.exports = router;
