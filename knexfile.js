import {} from 'dotenv/config';

const client = 'pg';
const connection = process.env.PG_CONNECT_STRING;
const migrations = { directory: `${__dirname}/src/db/migrations` };

module.exports = {
  development: {
    client,
    connection,
    migrations,
  },
  test: {
    client,
    connection,
    migrations,
  },
  production: {
    client,
    connection,
    pool: {
      min: 0,
      max: 12,
    },
    migrations,
  },
};
