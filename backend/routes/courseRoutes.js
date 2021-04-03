import express from 'express';
import { getCourses, getCourse, createCourse } from '../controllers/courseController.js';

const router = express.Router({ mergeParams: true });

router.route('/').get(getCourses).post(createCourse);
router.route('/:id').get(getCourse);

export default router;
