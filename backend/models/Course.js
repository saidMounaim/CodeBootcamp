import mongoose from 'mongoose';

const CourseSchema = mongoose.Schema({
	title: {
		type: String,
		trim: true,
		require: [true, 'please add a course title'],
	},

	description: {
		type: String,
		required: [true, 'please add a description'],
	},

	weeks: {
		type: String,
		required: [true, 'please add a number of weeks'],
	},

	tuition: {
		type: Number,
		required: [true, 'please add a tuition cost'],
	},

	minimumSkill: {
		type: String,
		required: [true, 'please add a minimum skill'],
		enum: ['beginner', 'intermediate', 'advanced'],
	},

	scholarshipAvailable: {
		type: Boolean,
		default: false,
	},

	createdAt: {
		type: Date,
		default: Date.now,
	},

	bootcamp: {
		type: mongoose.Schema.ObjectId,
		required: true,
		ref: 'Bootcamp',
	},

	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true,
	},
});

CourseSchema.statics.getAverageCost = async function (bootcampId) {
	const obj = await this.aggregate([
		{
			$match: { bootcamp: bootcampId },
		},
		{
			$group: {
				_id: '$bootcamp',
				averageCost: { $avg: '$tuition' },
			},
		},
	]);

	try {
		await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
			averageCost: Math.ceil(obj[0].averageCost / 10) * 10,
		});
	} catch (error) {
		console.log(error.message);
	}
};

CourseSchema.post('save', function (next) {
	this.constructor.getAverageCost(this.bootcamp);
});

CourseSchema.pre('remove', function (next) {
	this.constructor.getAverageCost(this.bootcamp);
});

const Course = mongoose.model('Course', CourseSchema);

export default Course;
