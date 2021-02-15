import Bootcamp from './models/Bootcamp.js';
import bootcamps from './data/bootcamps.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

connectDB();

const importBootcamps = async () => {
	try {
		await Bootcamp.deleteMany();
		await Bootcamp.insertMany(bootcamps);
	} catch (error) {
		console.log(error.message);
	}
};

const deleteBootcamps = async () => {
	try {
		await Bootcamp.deleteMany();
	} catch (error) {
		console.log(error.message);
	}
};

if (process.argv[2] === '-i') {
	importBootcamps();
} else if (process.argv[2] === '-d') {
	deleteBootcamps();
}
