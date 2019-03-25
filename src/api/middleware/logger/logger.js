import morgan from 'morgan';
import timestamp from 'time-stamp';

const env = process.env.NODE_ENV;

export default (req, res, next) => {
  if (env !== 'test') {
    morgan(`${timestamp('MM/DD/YYYY')} :method :url :status STATUS - :response-time ms`);
  }

  return (req, res, next) => next();
};
