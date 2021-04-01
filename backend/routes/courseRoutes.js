import express from 'express';
import { getCourses } from '../controllers/courseController.js';

const router = express.Router({ mergeParams: true });

router.get('/', getCourses);

export default router;
