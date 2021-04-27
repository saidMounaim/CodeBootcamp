import mongoose from 'mongoose';

const ReviewShema = mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Please add a title to bootcamp'],
	},

	text: {
		type: String,
		required: [true, 'Please add some text'],
	},

	rating: {
		type: Number,
		min: 1,
		max: 10,
		required: [true, 'Please add a rating beetwen 1 and 10'],
	},

	bootcamp: {
		type: mongoose.Schema.ObjectId,
		ref: 'Bootcamp',
		required: true,
	},

	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true,
	},
});

const Review = mongoose.model('Review', ReviewShema);

export default Review;
