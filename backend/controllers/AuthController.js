import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';
import sendEmail from '../utils/SendEmail.js';

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

//@DESC Get logged User
//@ROUTE /api/v1/auth/me
//@METHOD GET
const getMe = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (!user) {
		res.status(404);
		throw new Error('User not found');
	}

	res.status(201).json({ success: true, data: user });
});

//@DESC Forgot password
//@ROUTE /api/v1/auth/forgotpassword
//@METHOD POST
const forgotPassword = asyncHandler(async (req, res) => {
	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		res.status(404);
		throw new Error('User Not Found');
	}

	const resetToken = user.getResetPasswordToken();

	await user.save({ validateBeforeSave: false });

	const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/resetpassword/${resetToken}`;

	const message = `
		you requested to reset your password,<br /> 
		please check the link below to reset your password<br />
		<a href="${resetUrl}" target="_blank" >Reset Password</a>
	`;

	try {
		await sendEmail({
			email: user.email,
			subject: 'Password Reset Token',
			message,
		});

		res.status(201).json({ success: true, message: 'Email Sent' });
	} catch (error) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save({ validateBeforeSave: false });

		res.status(401);
		throw new Error('Email could not be sent');
	}

	res.status(201).json({ success: true, data: user });
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

export { register, login, getMe, forgotPassword };
