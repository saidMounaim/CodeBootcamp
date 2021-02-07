import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		const connect = await mongoose.connect(process.env.MONGO_URI, {
			useCreateIndex: true,
			useNewUrlParser: true,
			useFindAndModify: true,
			useUnifiedTopology: true,
		});
		console.log('MongoDB is connected');
	} catch (error) {
		console.log(error.message);
		process.exit(2);
	}
};

export default connectDB;