import {} from 'dotenv/config';
import to from 'await-to-js';
import { Client } from 'pg';
import Knex from 'knex';
import { Model } from 'objection';
import knexConfig from '../../knexfile';

/* eslint-disable no-unused-vars */

const env = process.env.NODE_ENV;
let config = '';

if (env === 'development') {
  config = knexConfig.development;
} else if (env === 'test') {
  config = knexConfig.test;
} else {
  config = knexConfig.production;
}

// Connecting knex to postgres
const knex = Knex(config);

// Linking objection models to knex, globally
Model.knex(knex);

if (env !== 'test') {
  console.log(`Postgres is attempting to connect to ${process.env.PG_DB_NAME}.`);
}

// Initial database connection attempt
const database = new Client({
  connectionString: config.connection,
});

// Listening for the connection to the database
const connectToDatabase = async () => {
  const [error, none] = await to(database.connect());

  if (error) {
    console.log(`Error connecting to ${process.env.PG_DB_NAME}`, error);
    return;
  }

  console.log(`Postgres connected to ${process.env.PG_DB_NAME}`);
};

// Listening for any errors from the database
database.on('error', error => {
  console.error('Postgres encountered an error and disconnected', error);
});

/* Process watchers  */

// Listening for ctrl+c app termination from terminal
process.on('SIGINT', () => {
  database
    .end()
    .then(() => {
      if (env !== 'test') {
        console.log('Postgres disconnected through app termination (SIGINT)');
      }

      process.exit(0);
    })
    .catch(error => console.log(`Error connecting to ${process.env.PG_DB_NAME}`, error));
});

// Listening for app termination from heroku
process.on('SIGTERM', () => {
  database
    .end()
    .then(() => {
      if (env !== 'test') {
        console.log('Postgres disconnected through app termination (SIGTERM)');
      }

      process.exit(0);
    })
    .catch(error => console.log(`Error connecting to ${process.env.PG_DB_NAME}`, error));
});

// Listening (once) for nodemon restart
process.once('SIGUSR2', () => {
  database
    .end()
    .then(() => {
      if (env !== 'test') {
        console.log('Postgres disconnected through app termination (SIGUSR2)');
      }

      process.exit(0);
    })
    .catch(error => console.log(`Error connecting to ${process.env.PG_DB_NAME}`, error));
});

export { database, connectToDatabase };
