import './config/config';
import dotenv from 'dotenv';
import path from 'path';
import express from 'express';
import morgan from 'morgan';
import timestamp from 'time-stamp';
import helmet from 'helmet';
import cors from 'cors';
import { connectToDatabase } from '@/db/database';
import routes from '@/api/routes';
import { repository } from '_root/package.json';

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

connectToDatabase();

// * Express Middleware
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(`${timestamp('MM/DD/YYYY')} :method :url :status STATUS - :response-time ms`));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());

// * API routes
app.use('/api', routes);

// * / Documentation Route
app.get('/', (req, res) => {
  const message = `Please go to ${repository} for API usage information.`;

  res.status(200).send(message);
});

export default app;
