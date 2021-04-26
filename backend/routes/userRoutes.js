import express from 'express';
import { getUsers, getSingleUser, createUser, updateUser, deleteUser } from '../controllers/userController.js';
import User from '../models/User.js';
import AdvancedResults from '../middleware/AdvancedResults.js';

const router = express.Router();

router.route('/').get(AdvancedResults(User), getUsers).post(createUser);
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);

export default router;
