import Bootcamp from '../models/Bootcamp.js';

// @DESC Get All Bootcamps
// @METHOD GET
// @ROUTE /api/v1/bootcamps
export const getBootcamps = async (req, res) => {
	try {
		const allBotcamps = await Bootcamp.find();
		res.status(200).json({ success: true, count: allBotcamps.length, data: allBotcamps });
	} catch (error) {
		res.status(401).json({ success: false, message: error.message });
		process.exit(1);
	}
};

// @DESC Get Single Bootcamp
// @METHOD GET
// @ROUTE /api/v1/bootcamps/:id
export const getSingleBootcamp = async (req, res) => {
	try {
		const { id } = req.params;
		if (id) {
			const bootcamp = await Bootcamp.findById(id);
			res.status(200).json({ success: true, data: bootcamp });
		}
	} catch (error) {
		res.status(401).json({ success: false, message: error.message });
		process.exit(1);
	}
};

// @DESC Create Bootcamps
// @METHOD POST
// @ROUTE /api/v1/bootcamps
export const createBootcamps = async (req, res) => {
	try {
		const bootcamps = await Bootcamp.create(req.body);
		res.status(201).json({ success: true, data: bootcamps });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
		process.exit(1);
	}
};

// @DESC Update Bootcamps
// @METHOD PUT
// @ROUTE /api/v1/bootcamps/:id
export const updateBootcamps = async (req, res) => {
	const { id } = req.params;
	const bootcamp = await Bootcamp.findByIdAndUpdate(id, req.body, {
		new: true,
		runValidators: true,
	});
	if (!id) {
		return res.status(400).json({ success: false, message: `Bootcamp Not Found` });
	}
	res.status(200).json({ success: true, data: bootcamp });
};

// @DESC Delete Bootcamps
// @METHOD DELETE
// @ROUTE /api/v1/bootcamps
export const deleteBootcamps = async (req, res) => {
	const { id } = req.params;
	await Bootcamp.findByIdAndDelete(id);
	if (!id) {
		return res.status(400).json({ success: false, message: `Bootcamp Not Found` });
	}
	res.status(200).json({ success: true, data: {} });
};
