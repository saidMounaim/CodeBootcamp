import asyncHandler from 'express-async-handler';
import Review from '../models/Review.js';

//@DESC Get All Reviews
//@ROUTE /api/v1/bootcamps/:bootcampId/reviews
//@METHOD GET
export const getReviews = asyncHandler(async (req, res) => {
	if (req.params.bootcampId) {
		const reviews = await Review.find({ bootcamp: req.params.id });
		res.status(201).json({ success: true, count: reviews.length, data: reviews });
	} else {
		res.json(res.AdvancedResults);
	}
});

//@DESC Get Single Review
//@ROUTE /api/v1/reviews/:id
//@METHOD GET
export const getSingleReview = asyncHandler(async (req, res) => {
	const review = await Review.findById(req.params.id).populate({
		path: 'bootcamp',
		select: 'name description',
	});

	if (!review) {
		res.status(404);
		throw new Error('Review Not Found');
	}

	res.status(201).json({ success: true, data: review });
});
