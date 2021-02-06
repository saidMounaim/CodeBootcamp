import express from 'express';
import dotenv from 'dotenv';

// Load env vars
dotenv.config();

const app = express();

const PORT = 5000 || process.env.PORT;

app.listen(PORT, console.log(`Server is running on ${PORT}`));
