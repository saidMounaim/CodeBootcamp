import express from 'express';
import { getReviews, getSingleReview } from '../controllers/reviewController.js';
import AdvancedResults from '../middleware/AdvancedResults.js';
import Review from '../models/Review.js';

const router = express.Router({ mergeParams: true });

router.route('/').get(AdvancedResults(Review, { path: 'bootcamp', select: 'name description' }), getReviews);
router.route('/:id').get(getSingleReview);

export default router;
