import mongoose from 'mongoose';

const BootcampShema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please add a name'],
		unique: true,
		trim: true,
		maxlength: [50, 'Name can not be more than 50 characters'],
	},
	slug: String,
	description: {
		type: String,
		required: [true, 'Please add a description'],
		maxlength: [500, 'Description can not be more than 50 characters'],
	},
	website: {
		type: String,
		match: [
			/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
			'Please use a valid URL With HTTP or HTTPS',
		],
	},
	phone: {
		type: String,
		maxlength: [20, 'Phone can not be more than 20 characters'],
	},
	email: {
		type: String,
		match: [
			/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
			'Please use a valid Email',
		],
	},
	adresse: {
		type: String,
		required: [true, 'Please add an adresse'],
	},
	location: {
		type: {
			type: String, // Don't do `{ location: { type: String } }`
			enum: ['Point'], // 'location.type' must be 'Point'
			required: true,
		},
		coordinates: {
			type: [Number],
			required: true,
		},
		formattedAddress: String,
		street: String,
		city: String,
		state: String,
		zipcode: String,
		country: String,
	},
	careers: {
		type: [String], // Array Of String
		required: true,
		enum: ['Web Development', 'Mobile Development', 'UI/UX', 'Data Science', 'Business', 'Other'],
	},
	averageRaiting: {
		type: Number,
		minlength: [1, 'Raiting must be at least 1'],
		maxlength: [10, 'Raiting can not be more than 10'],
	},
	averageCost: Number,
	photo: {
		type: String,
		default: 'no-photo.jpg',
	},
	housing: {
		type: Boolean,
		default: false,
	},
	jobAssistance: {
		type: Boolean,
		default: false,
	},
	jobGuarantee: {
		type: Boolean,
		default: false,
	},
	acceptGi: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Bootcamp = mongoose.model(BootcampShema, 'Bootcamp');

export default Bootcamp;
