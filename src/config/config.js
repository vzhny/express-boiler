import {} from 'dotenv/config';

const env = process.env.NODE_ENV;

if (env === 'development') {
  process.env.PG_HOST = process.env.PG_HOST_DEV;
  process.env.PG_USER = process.env.PG_USER_DEV;
  process.env.PG_PASSWORD = process.env.PG_PASSWORD_DEV;
  process.env.PG_DATABASE = process.env.PG_DATABASE_DEV;

  process.env.PG_CONNECT_STRING = process.env.PG_CONNECT_STRING_DEV;

  process.env.JWT_SECRET = process.env.JWT_SECRET_DEV;
  process.env.PG_DB_NAME = process.env.PG_DB_NAME_DEV;
} else if (env === 'test') {
  process.env.PG_HOST = process.env.PG_HOST_TEST;
  process.env.PG_USER = process.env.PG_USER_TEST;
  process.env.PG_PASSWORD = process.env.PG_PASSWORD_TEST;
  process.env.PG_DATABASE = process.env.PG_DATABASE_TEST;

  process.env.PG_CONNECT_STRING = process.env.PG_CONNECT_STRING_TEST;

  process.env.JWT_SECRET = process.env.JWT_SECRET_TEST;
  process.env.PG_DB_NAME = process.env.PG_DB_NAME_TEST;
}
