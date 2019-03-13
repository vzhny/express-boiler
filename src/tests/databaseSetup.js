import knexMigrate from 'knex-migrate';
import knex from '@/db/database';

export const rollbackAndMigrate = async () => {
  // Example logger from knex-migrate readme.
  const log = ({ action, migration }) => console.log(`Performing ${action} on ${migration}.`);

  try {
    await knexMigrate('down', { to: 0 }, log);
    await knexMigrate('up', { to: 20190308111839 }, log);
    // Add any additional migrations here!
  } catch (error) {
    console.log('An error occurred when rolling back and migrating.', error);
  }
};

export const closeDatabaseConnection = async () => {
  try {
    await knex.destroy();
  } catch (error) {
    console.log('There was an error closing the database connection.', error);
  }
};
