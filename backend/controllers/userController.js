import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

// @DESC Get All Users
// @METHOD GET
// @ROUTE /api/v1/users
export const getUsers = asyncHandler(async (req, res) => {
	res.json(res.AdvancedResults);
});

// @DESC Create User
// @METHOD POST
// @ROUTE /api/v1/users
export const createUser = asyncHandler(async (req, res) => {
	const user = await User.create(req.body);
	res.status(201).json({ success: true, data: user });
});

// @DESC Get Single User
// @METHOD GET
// @ROUTE /api/v1/users/:id
export const getSingleUser = asyncHandler(async (req, res) => {
	const { id } = req.params;
	if (id) {
		const user = await User.findById(id);
		res.json({ success: true, data: user });
	} else {
		res.status(404);
		throw new Error(`User Not Found`);
	}
});

// @DESC Update Users
// @METHOD PUT
// @ROUTE /api/v1/users/:id
export const updateUser = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const user = await User.findByIdAndUpdate(id, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({ success: true, data: user });
});

// @DESC Delete User
// @METHOD DELETE
// @ROUTE /api/v1/users/:id
export const deleteUser = asyncHandler(async (req, res) => {
	const { id } = req.params;

	const user = await User.findById(id);
	if (!user) {
		res.status(404);
		throw new Error(`User Not Found`);
	}
	user.remove();

	res.status(200).json({ success: true, data: {} });
});
