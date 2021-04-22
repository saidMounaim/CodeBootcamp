import Bootcamp from '../models/Bootcamp.js';
import asyncHandler from 'express-async-handler';
import geocoder from '../utils/geocoder.js';
import path from 'path';

// @DESC Get All Bootcamps
// @METHOD GET
// @ROUTE /api/v1/bootcamps
export const getBootcamps = asyncHandler(async (req, res) => {
	res.json(res.AdvancedResults);
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
	req.body.user = req.user.id;
	const bootcamps = await Bootcamp.create(req.body);

	const publishedBootcamp = await Bootcamp.findOne({ user: req.user.id });

	if (publishedBootcamp && req.user.role !== 'admin') {
		res.status(401);
		throw new Error('the user has already published a bootcamp');
	}

	res.json({ success: true, data: bootcamps });
});

// @DESC Update Bootcamps
// @METHOD PUT
// @ROUTE /api/v1/bootcamps/:id
export const updateBootcamps = asyncHandler(async (req, res) => {
	const { id } = req.params;
	let bootcamp = await Bootcamp.findById(id);

	if (!bootcamp) {
		res.status(404);
		throw new Error(`Bootcamp Not Found`);
	}

	if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
		res.status(401);
		throw new Error('user role not authorize to update this bootcamp');
	}

	bootcamp = await Bootcamp.findByIdAndUpdate(id, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({ success: true, data: bootcamp });
});

// @DESC Delete Bootcamps
// @METHOD DELETE
// @ROUTE /api/v1/bootcamps
export const deleteBootcamps = asyncHandler(async (req, res) => {
	const { id } = req.params;

	const bootcamp = await Bootcamp.findById(id);
	bootcamp.remove();

	if (!bootcamp) {
		res.status(404);
		throw new Error(`Bootcamp Not Found`);
	}

	if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
		res.status(401);
		throw new Error('user role not authorize to delete this bootcamp');
	}

	res.status(200).json({ success: true, data: {} });
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

//@DESC Upload Photo For Bootcamp
//@METHOD PUT
//@ROUTE /api/v1/bootcamps/:id/photo
export const bootcampUploadPhoto = asyncHandler(async (req, res) => {
	const bootcamp = await Bootcamp.findById(req.params.id);

	if (!bootcamp) {
		res.status(404);
		throw new Error('Bootcamp Not Found');
	}

	if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
		res.status(401);
		throw new Error('user role not authorize to upload photo');
	}

	if (!req.files) {
		res.status(400);
		throw new Error('Please upload a file');
	}

	const file = req.files.file;

	if (!file.mimetype.startsWith('image')) {
		res.status(400);
		throw new Error('Please upload a image file');
	}

	if (file.size > process.env.MAX_FILE_UPLOAD) {
		res.status(400);
		throw new Error(`Please upload a image less than ${process.env.MAX_FILE_UPLOAD}`);
	}

	file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

	file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
		if (err) {
			res.status(400);
			throw new Error(err);
		}

		await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });
		res.status(201).json({ success: true, data: file.name });
	});
});
