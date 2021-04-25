import express from 'express';
import { ProtectMiddleware } from '../middleware/ProtectMiddleware.js';

import { register, login, getMe, forgotPassword, resetPassword } from '../controllers/AuthController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me/', ProtectMiddleware, getMe);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

export default router;
