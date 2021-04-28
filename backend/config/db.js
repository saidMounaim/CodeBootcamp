import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		const connect = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		});
		console.log('MongoDB is connected');
	} catch (error) {
		console.log(error.message);
		process.exit(2);
	}
};

export default connectDB;
