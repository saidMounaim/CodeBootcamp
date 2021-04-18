import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

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

	const token = generateToken(user._id);

	res.status(201).json({ success: true, token });
});

export { register };
