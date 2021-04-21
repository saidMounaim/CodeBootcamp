import express from 'express';
import { getCourses, getCourse, createCourse, updateCourse, deleteCourse } from '../controllers/courseController.js';

import Course from '../models/Course.js';
import AdvanceResults from '../middleware/AdvancedResults.js';

const router = express.Router({ mergeParams: true });

import { ProtectMiddleware, AuthorizeMiddleware } from '../middleware/ProtectMiddleware.js';

router
	.route('/')
	.get(
		AdvanceResults(Course, {
			path: 'bootcamp',
			select: 'name description',
		}),
		getCourses
	)
	.post(ProtectMiddleware, AuthorizeMiddleware('admin', 'publisher'), createCourse);
router
	.route('/:id')
	.get(getCourse)
	.put(ProtectMiddleware, AuthorizeMiddleware('admin', 'publisher'), updateCourse)
	.delete(ProtectMiddleware, AuthorizeMiddleware('admin', 'publisher'), deleteCourse);

export default router;
