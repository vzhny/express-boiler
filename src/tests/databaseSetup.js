import { database } from '@/db/database';
import knexMigrate from 'knex-migrate';

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

export const closeDatabaseConnection = () => {
  database
    .end()
    .then(() => process.exit(0))
    .catch(error => console.log(error));
};
