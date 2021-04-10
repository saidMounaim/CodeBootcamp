import Bootcamp from './models/Bootcamp.js';
import bootcamps from './data/bootcamps.js';
import Course from './models/Course.js';
import courses from './data/courses.js';
import connectDB from './config/db.js';

connectDB();

const importData = async () => {
	try {
		await Bootcamp.deleteMany();
		await Course.deleteMany();

		await Course.create(courses);
		await Bootcamp.create(bootcamps);
	} catch (error) {
		console.log(error.message);
	}
};

const deleteData = async () => {
	try {
		await Bootcamp.deleteMany();
		await Course.deleteMany();
	} catch (error) {
		console.log(error.message);
	}
};

if (process.argv[2] === '-i') {
	importData();
} else if (process.argv[2] === '-d') {
	deleteData();
}
