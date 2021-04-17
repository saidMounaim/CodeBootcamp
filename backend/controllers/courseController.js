import asyncHandler from 'express-async-handler';
import Course from '../models/Course.js';
import Bootcamp from '../models/Bootcamp.js';

// @DESC Get All Courses
// @METHOD GET
// @ROUTE /api/v1/courses
// @ROUTE /api/v1/bootcamps/:bootcampId/courses
const getCourses = asyncHandler(async (req, res) => {
	if (req.params.bootcampId) {
		const courses = await Course.find({ bootcamp: req.params.bootcampId });
		return res.status(201).json({ success: true, count: courses.length, data: courses });
	} else {
		res.status(201).json(res.AdvancedResults);
	}
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

//@DESC Update course
//@METHOD PUT
//@ROUTE /api/v1/courses/:id
const updateCourse = asyncHandler(async (req, res) => {
	let course = await Course.findById(req.params.id);
	if (!course) {
		throw new Error('Course Not Found');
	}

	course = await Course.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(201).json({ success: true, data: course });
});

//@DESC Delete Course
//@METHOD DELETE
//@ROUTE /api/v1/courses/:id
const deleteCourse = asyncHandler(async (req, res) => {
	let course = Course.findById(req.params.id);

	if (!course) {
		throw new Error('Course not found');
	}

	await course.remove();

	res.status(201).json({ success: true, data: {} });
});

export { getCourses, getCourse, createCourse, updateCourse, deleteCourse };
