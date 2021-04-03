import asyncHandler from 'express-async-handler';
import Course from '../models/Course.js';
import Bootcamp from '../models/Bootcamp.js';

// @DESC Get All Courses
// @METHOD GET
// @ROUTE /api/v1/courses
// @ROUTE /api/v1/bootcamps/:bootcampId/courses
const getCourses = asyncHandler(async (req, res) => {
	let query;

	if (req.params.bootcampId) {
		query = Course.find({ bootcamp: req.params.bootcampId });
	} else {
		query = Course.find({}).populate({
			path: 'bootcamp',
			select: 'name description',
		});
	}

	const courses = await query;

	res.status(201).json({ success: true, count: courses.length, data: courses });
});

//@DESC Get Single Course
//@METHOD GET
//@ROUTE /api/v1/courses/:id
const getCourse = asyncHandler(async (req, res) => {
	const course = await Course.findById(req.params.id).populate({
		path: 'bootcamp',
		select: 'name description',
	});
	if (!course) {
		throw new Error('Course Not Found');
	}
	res.status(201).json({ success: true, data: course });
});

//@DESC Create new course
//@METHOD POST
//@ROUTE /api/v1/bootcamps/:bootcampId/courses
const createCourse = asyncHandler(async (req, res) => {
	req.body.bootcamp = req.params.bootcampId;

	const bootcamp = await Bootcamp.findById(req.params.bootcampId);

	if (!bootcamp) {
		throw new Error('Bootcamp Not Found');
	}

	const course = await Course.create(req.body);

	res.status(201).json({ success: true, data: course });
});

export { getCourses, getCourse, createCourse };
