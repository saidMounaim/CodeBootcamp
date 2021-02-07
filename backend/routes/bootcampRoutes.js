import express from 'express';
import {
	getBootcamps,
	getSingleBootcamp,
	createBootcamps,
	updateBootcamps,
	deleteBootcamps,
} from '../controllers/bootcampController.js';

const router = express.Router();

router.route('/').get(getBootcamps).post(createBootcamps);
router.route('/:id').get(getSingleBootcamp).put(updateBootcamps).delete(deleteBootcamps);

export default router;
