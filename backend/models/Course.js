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
});

const Course = mongoose.model('Course', CourseSchema);

export default Course;
