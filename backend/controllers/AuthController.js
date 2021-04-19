import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';

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

//@DESC Login
//@ROUTE /api/v1/auth/login
//@METHOD POST
const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(401);
		throw new Error(`Please provide an email and password`);
	}

	const user = await User.findOne({ email: email }).select('+password');

	if (!user) {
		res.status(401);
		throw new Error('Invalid credentials');
	}

	const passwordInvalid = bcrypt.compareSync(password, user.password);

	if (!passwordInvalid) {
		res.status(401);
		throw new Error('Invalid password');
	}

	const token = generateToken(user._id);

	res.status(201).json({ success: true, token });
});

export { register, login };
