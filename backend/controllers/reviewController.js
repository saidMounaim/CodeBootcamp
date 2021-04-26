import asyncHandler from 'express-async-handler';
import Review from '../models/Review.js';

//@DESC Get All Reviews
//@ROUTE /api/v1/bootcamps/:bootcampId/reviews
export const getReviews = asyncHandler(async (req, res) => {
	if (req.params.bootcampId) {
		const reviews = await Review.find({ bootcamp: req.params.id });
		res.status(201).json({ success: true, count: reviews.length, data: reviews });
	} else {
		res.json(res.AdvancedResults);
	}
});
