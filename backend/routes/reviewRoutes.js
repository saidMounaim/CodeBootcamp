import express from 'express';
import { getReviews, getSingleReview, addReview } from '../controllers/reviewController.js';
import AdvancedResults from '../middleware/AdvancedResults.js';
import { ProtectMiddleware, AuthorizeMiddleware } from '../middleware/ProtectMiddleware.js';
import Review from '../models/Review.js';

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.get(AdvancedResults(Review, { path: 'bootcamp', select: 'name description' }), getReviews)
	.post(ProtectMiddleware, AuthorizeMiddleware('user', 'admin'), addReview);
router.route('/:id').get(getSingleReview);

export default router;
