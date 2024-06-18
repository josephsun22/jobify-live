import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

// routers
import jobRouter from './routers/jobRouter.js';
import authRouter from './routers/authRouter.js';
import userRouter from './routers/userRouter.js';

// middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';
import { validateJobInput } from './middleware/validationMiddleware.js'; 

// public
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, './public')));


app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/', (req, res) => {
  console.log(req);

  res.json({ message: 'Data received', data: req.body });
});

app.get('/api/v1/test', (req, res) => {
  res.json({ msg: 'test route' });
});

app.use(express.static(path.resolve(__dirname, '/public')));


app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authenticateUser, userRouter);

// Not Found Middleware
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

// Not Found and Error Middleware
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

// connect mongodb
import mongoose from 'mongoose';

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
