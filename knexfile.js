import {} from 'dotenv/config';

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.PG_CONNECT_STRING_DEV,
    migrations: {
      directory: `${__dirname}/src/db/migrations`,
    },
  },
  test: {
    client: 'pg',
    connection: process.env.PG_CONNECT_STRING_TEST,
    migrations: {
      directory: `${__dirname}/src/db/migrations`,
    },
  },
  production: {
    client: 'pg',
    connection: process.env.PG_CONNECT_STRING,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: `${__dirname}/src/db/migrations`,
    },
  },
};
