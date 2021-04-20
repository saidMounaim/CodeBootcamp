import express from 'express';
import { ProtectMiddleware } from '../middleware/ProtectMiddleware.js';

import { register, login, getMe } from '../controllers/AuthController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me/', ProtectMiddleware, getMe);

export default router;
