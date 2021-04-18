import asyncHandler from 'express-async-handler';

//@DESC Register
//@ROUTE /api/v1/auth/register
//@METHOD POST
const register = asyncHandler(async (req, res) => {
	res.status(201).json({ success: true });
});

export { register };
