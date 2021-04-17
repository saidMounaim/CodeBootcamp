import express from 'express';
import { getCourses, getCourse, createCourse, updateCourse, deleteCourse } from '../controllers/courseController.js';

import Course from '../models/Course.js';
import AdvanceResults from '../middleware/AdvancedResults.js';

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.get(
		AdvanceResults(Course, {
			path: 'bootcamp',
			select: 'name description',
		}),
		getCourses
	)
	.post(createCourse);
router.route('/:id').get(getCourse).put(updateCourse).delete(deleteCourse);

export default router;
