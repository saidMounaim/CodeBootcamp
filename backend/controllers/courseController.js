import asyncHandler from 'express-async-handler';
import Course from '../models/Course.js';

// @DESC Get All Courses
// @METHOD GET
// @ROUTE /api/v1/courses
// @ROUTE /api/v1/bootcamp/:bootcampId/courses
const getCourses = asyncHandler(async (req, res) => {
	let query;

	if (req.params.bootcampId) {
		query = Course.find({ bootcamp: req.params.bootcampId });
	} else {
		query = Course.find({});
	}

	const courses = await query;

	res.status(201).json({ success: true, count: courses.length, data: courses });
});

export { getCourses };
