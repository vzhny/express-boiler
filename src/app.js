import _ from '@/config/config'; // eslint-disable-line
import express from 'express';
import bearerToken from 'express-bearer-token';
import helmet from 'helmet';
import cors from 'cors';
import logger from '@/api/middleware/logger/logger';
import routes from '@/api/routes';
import '@/db/database';

const app = express();

// * Express Middleware
app.use(logger());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());
app.use(bearerToken());

// * API routes
app.use('/api', routes);

// * / Documentation Route
app.get('/', (req, res) => {
  const message = 'Please go to https://github.com/vzhny/express-boiler for API usage information.';

  res.status(200).send(message);
});

export default app;
