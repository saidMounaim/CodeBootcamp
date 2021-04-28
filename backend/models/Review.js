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

ReviewShema.statics.getAverageRating = async function (bootcampId) {
	const obj = await this.aggregate([
		{
			$match: { bootcamp: bootcampId },
		},
		{
			$group: {
				_id: '$bootcamp',
				averageRating: { $avg: '$rating' },
			},
		},
	]);

	try {
		await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
			averageRating: obj[0].averageRating,
		});
	} catch (error) {
		console.log(error.message);
	}
};

ReviewShema.post('save', function (next) {
	this.constructor.getAverageRating(this.bootcamp);
});

ReviewShema.pre('remove', function (next) {
	this.constructor.getAverageRating(this.bootcamp);
});

ReviewShema.index({ bootcamp: 1, user: 1 }, { unique: true });

const Review = mongoose.model('Review', ReviewShema);

export default Review;
