// @DESC Get All Bootcamps
// @METHOD GET
// @ROUTE /api/v1/bootcamps
export const getBootcamps = (req, res) => {
	res.status(200).json({ success: true, message: 'Get All Bootcamps' });
};

// @DESC Get Single Bootcamp
// @METHOD GET
// @ROUTE /api/v1/bootcamps/:id
export const getSingleBootcamp = (req, res) => {
	res.status(200).json({ success: true, message: 'Get Single Bootcamps' });
};

// @DESC Create Bootcamps
// @METHOD POST
// @ROUTE /api/v1/bootcamps
export const createBootcamps = (req, res) => {
	res.status(200).json({ success: true, message: 'Create New Bootcamp' });
};

// @DESC Update Bootcamps
// @METHOD PUT
// @ROUTE /api/v1/bootcamps/:id
export const updateBootcamps = (req, res) => {
	res.status(200).json({ success: true, message: `Update Bootcamp ${req.params.id}` });
};

// @DESC Delete Bootcamps
// @METHOD DELETE
// @ROUTE /api/v1/bootcamps
export const deleteBootcamps = (req, res) => {
	res.status(200).json({ success: true, message: `Delete Bootcamp ${req.params.id}` });
};
