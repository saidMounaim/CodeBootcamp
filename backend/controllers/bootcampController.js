import Bootcamp from '../models/Bootcamp.js';
import asyncHandler from 'express-async-handler';
import geocoder from '../utils/geocoder.js';

// @DESC Get All Bootcamps
// @METHOD GET
// @ROUTE /api/v1/bootcamps
export const getBootcamps = asyncHandler(async (req, res) => {
	let query;

	let queryStr = JSON.stringify(req.query);

	queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

	query = Bootcamp.find(JSON.parse(queryStr));

	const allBotcamps = await query;
	res.json({ success: true, count: allBotcamps.length, data: allBotcamps });
});

// @DESC Get Single Bootcamp
// @METHOD GET
// @ROUTE /api/v1/bootcamps/:id
export const getSingleBootcamp = asyncHandler(async (req, res) => {
	const { id } = req.params;
	if (id) {
		const bootcamp = await Bootcamp.findById(id);
		res.json({ success: true, data: bootcamp });
	} else {
		res.status(404);
		throw new Error(`Bootcamp Not Found`);
	}
});

// @DESC Create Bootcamps
// @METHOD POST
// @ROUTE /api/v1/bootcamps
export const createBootcamps = asyncHandler(async (req, res) => {
	const bootcamps = await Bootcamp.create(req.body);
	res.json({ success: true, data: bootcamps });
});

// @DESC Update Bootcamps
// @METHOD PUT
// @ROUTE /api/v1/bootcamps/:id
export const updateBootcamps = asyncHandler(async (req, res) => {
	const { id } = req.params;
	if (id) {
		const bootcamp = await Bootcamp.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json({ success: true, data: bootcamp });
	} else {
		res.status(404);
		throw new Error(`Bootcamp Not Found`);
	}
});

// @DESC Delete Bootcamps
// @METHOD DELETE
// @ROUTE /api/v1/bootcamps
export const deleteBootcamps = asyncHandler(async (req, res) => {
	const { id } = req.params;
	await Bootcamp.findByIdAndDelete(id);
	if (id) {
		res.status(200).json({ success: true, data: {} });
	} else {
		res.status(404);
		throw new Error(`Bootcamp Not Found`);
	}
});

// @DESC Get Bootcamps within a radius
// @METHOD GET
// @ROUTE /api/bootcamps/radius/:zipcode/:distance
export const getBootcampsRadius = asyncHandler(async (req, res) => {
	const { zipcode, distance } = req.params;

	// get lng/ltd
	const loc = await geocoder.geocode(zipcode);
	const ltd = loc[0].latitude;
	const lgd = loc[0].longitude;

	// Calc radius using radians
	// Divide dist by radius of Earth
	const radius = distance / 3963;

	const bootcamps = await Bootcamp.find({
		location: { $geoWithin: { $centerSphere: [[lgd, ltd], radius] } },
	});

	res.status(200).json({
		success: true,
		count: bootcamps.length,
		data: bootcamps,
	});
});
