import { database } from '@/db/database';

export const dropAllTables = () => {
  database
    .query('TRUNCATE users;')
    .then(result => console.log("'users' tables truncated."))
    .catch(error => console.log("An error occurred truncating the 'users' table.", error));
  // Add any more tables that need to be cleared below
};

export const closeDatabaseConnection = () => {
  database
    .end()
    .then(() => process.exit(0))
    .catch(error => console.log(error));
};
