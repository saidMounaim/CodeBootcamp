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
	const salt = bcrypt.genSaltSync(10);
	this.password = bcrypt.hashSync(this.password, salt);
	next();
});

const User = mongoose.model('User', UserShema);

export default User;
