import express from 'express';
import { ProtectMiddleware } from '../middleware/ProtectMiddleware.js';

import {
	register,
	login,
	getMe,
	forgotPassword,
	resetPassword,
	updateDetails,
	updatePassword,
} from '../controllers/AuthController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me/', ProtectMiddleware, getMe);
router.put('/updatedetails', ProtectMiddleware, updateDetails);
router.put('/updatepassword', ProtectMiddleware, updatePassword);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

export default router;
