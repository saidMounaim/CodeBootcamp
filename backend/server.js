import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import xss from 'xss-clean';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/ErrorMiddleware.js';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import { ProtectMiddleware, AuthorizeMiddleware } from './middleware/ProtectMiddleware.js';

// ROUTES FILES
import bootcampRoutes from './routes/bootcampRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import AuthRoutes from './routes/AuthRoutes.js';
import userRoutes from './routes/userRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

// Load env vars
dotenv.config();

// Connect To DB
connectDB();

const app = express();

if (process.env.NODE_ENV === 'developement') {
	app.use(morgan('dev'));
}

app.use(express.json());

app.use(cookieParser());

app.use(fileUpload());

app.use(mongoSanitize());

app.use(helmet());

app.use(xss());

app.use(hpp());

app.use(cors());

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
});

//  apply to all requests
app.use(limiter);

app.get('/', (req, res) => {
	res.status(200).json({ message: 'Welcome To Backend Dev Bootcamp' });
});

// All Router
app.use('/api/v1/bootcamps', bootcampRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/auth', AuthRoutes);
app.use('/api/v1/users', ProtectMiddleware, AuthorizeMiddleware('admin'), userRoutes);
app.use('/api/v1/reviews', reviewRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = 5000 || process.env.PORT;

app.listen(PORT, console.log(`Server is running on ${PORT}`));
