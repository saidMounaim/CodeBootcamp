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

	sendTokenToResponse(user, 201, res);
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

	sendTokenToResponse(user, 201, res);
});

const sendTokenToResponse = (user, statusCode, res) => {
	const token = generateToken(user);

	let options = {
		expires: new Date(Date.now() + process.env.JWT_COOKE_EXPIRE * 24 * 60 * 60 * 1000),
		httpOnly: true,
	};

	if (process.env.NODE_ENV === 'production') {
		options.secure = true;
	}

	res.status(statusCode).cookie('Token', token, options).json({ success: true, token });
};

export { register, login };
