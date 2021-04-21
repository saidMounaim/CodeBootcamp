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

import Bootcamp from '../models/Bootcamp.js';

import AdvancedResults from '../middleware/AdvancedResults.js';

import courseRoutes from './courseRoutes.js';

import { ProtectMiddleware, AuthorizeMiddleware } from '../middleware/ProtectMiddleware.js';

const router = express.Router();

router.use('/:bootcampId/courses', courseRoutes);

router.route('/radius/:zipcode/:distance').get(getBootcampsRadius);
router
	.route('/')
	.get(AdvancedResults(Bootcamp, 'courses'), getBootcamps)
	.post(ProtectMiddleware, AuthorizeMiddleware('admin', 'publisher'), createBootcamps);
router
	.route('/:id')
	.get(getSingleBootcamp)
	.put(ProtectMiddleware, AuthorizeMiddleware('admin', 'publisher'), updateBootcamps)
	.delete(ProtectMiddleware, AuthorizeMiddleware('admin', 'publisher'), deleteBootcamps);
router.route('/:id/photo').put(ProtectMiddleware, AuthorizeMiddleware('admin', 'publisher'), bootcampUploadPhoto);

export default router;
