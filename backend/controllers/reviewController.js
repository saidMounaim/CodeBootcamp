import asyncHandler from 'express-async-handler';
import Review from '../models/Review.js';
import Bootcamp from '../models/Bootcamp.js';

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

//@DESC Create new review
//@ROUTE /api/v1/bootcamps/:bootcampId/reviews
//@METHOD POST
export const addReview = asyncHandler(async (req, res) => {
	req.body.bootcamp = req.params.bootcampId;
	req.body.user = req.user.id;

	const bootcamp = await Bootcamp.findById(req.params.bootcampId);

	if (!bootcamp) {
		res.status(404);
		throw new Error('Bootcamp Not Found');
	}

	const review = await Review.create(req.body);

	res.status(201).json({ success: true, data: review });
});
