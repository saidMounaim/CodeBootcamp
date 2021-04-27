import Bootcamp from './models/Bootcamp.js';
import bootcamps from './data/bootcamps.js';
import Course from './models/Course.js';
import User from './models/User.js';
import Review from './models/Review.js';
import courses from './data/courses.js';
import users from './data/users.js';
import reviews from './data/reviews.js';
import connectDB from './config/db.js';

connectDB();

const importData = async () => {
	try {
		await Bootcamp.deleteMany();
		await Course.deleteMany();
		await User.deleteMany();
		await Review.deleteMany();

		await Course.create(courses);
		await Bootcamp.create(bootcamps);
		await User.create(users);
		await Review.create(reviews);
	} catch (error) {
		console.log(error.message);
	}
};

const deleteData = async () => {
	try {
		await Bootcamp.deleteMany();
		await Course.deleteMany();
		await User.deleteMany();
		await Review.deleteMany();
	} catch (error) {
		console.log(error.message);
	}
};

if (process.argv[2] === '-i') {
	importData();
} else if (process.argv[2] === '-d') {
	deleteData();
}
