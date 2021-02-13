import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/ErrorMiddleware.js';

// ROUTES FILES
import bootcampRoutes from './routes/bootcampRoutes.js';

// Load env vars
dotenv.config();

// Connect To DB
connectDB();

const app = express();

if (process.env.NODE_ENV === 'developement') {
	app.use(morgan('dev'));
}

app.use(express.json());

app.get('/', (req, res) => {
	res.status(200).json({ message: 'Welcome To Backend Dev Bootcamp' });
});

// BOOTCAMPS ROUTER
app.use('/api/v1/bootcamps', bootcampRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = 5000 || process.env.PORT;

app.listen(PORT, console.log(`Server is running on ${PORT}`));
