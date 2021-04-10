import express from 'express';
import {
	getBootcamps,
	getSingleBootcamp,
	createBootcamps,
	updateBootcamps,
	deleteBootcamps,
	getBootcampsRadius,
	bootcampUploadPhoto,
} from '../controllers/bootcampController.js';

import courseRoutes from './courseRoutes.js';

const router = express.Router();

router.use('/:bootcampId/courses', courseRoutes);

router.route('/radius/:zipcode/:distance').get(getBootcampsRadius);
router.route('/').get(getBootcamps).post(createBootcamps);
router.route('/:id').get(getSingleBootcamp).put(updateBootcamps).delete(deleteBootcamps);
router.route('/:id/photo').put(bootcampUploadPhoto);

export default router;
