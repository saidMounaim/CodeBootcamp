import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

//@DESC Register
//@ROUTE /api/v1/auth/register
//@METHOD POST
const register = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	const user = await User.create({
		name,
		email,
		password,
	});

	res.status(201).json({ success: true, data: user });
});

export { register };
