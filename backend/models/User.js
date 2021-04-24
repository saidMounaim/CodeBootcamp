import crypto from 'crypto';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserShema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please add a name'],
	},

	email: {
		type: String,
		required: [true, 'Please add a email'],
		match: [
			/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
			'Please use a valid Email',
		],
	},

	role: {
		type: String,
		enum: ['user', 'publisher'],
		default: 'user',
	},

	password: {
		type: String,
		required: [true, 'Please add a password'],
		minlength: 6,
		select: false,
	},

	resetPasswordToken: String,
	resetPasswordExpire: Date,

	createdAt: {
		type: Date,
		default: Date.now,
	},
});

UserShema.pre('save', function (next) {
	if (!this.isModified('password')) {
		next();
	}

	const salt = bcrypt.genSaltSync(10);
	this.password = bcrypt.hashSync(this.password, salt);
	next();
});

UserShema.methods.getResetPasswordToken = function () {
	const resetToken = crypto.randomBytes(20).toString('hex');

	this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

	this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

	return resetToken;
};

const User = mongoose.model('User', UserShema);

export default User;
