import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

export const ProtectMiddleware = asyncHandler(async (req, res, next) => {
	let token;

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1];
	}

	if (!token) {
		res.status(401);
		throw new Error('Not Authorize to access this route');
	}

	try {
		var decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = await User.findById(decoded.id);
		next();
	} catch (error) {
		res.status(401);
		throw new Error(error.message);
	}
});

export const AuthorizeMiddleware = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			res.status(401);
			throw new Error('User role not authorize to access this route');
		}
		next();
	};
};
