# Express Boiler

![Pot Logo](pot_logo.png 'Pot Logo')

Icon made by [Freepik](https://www.flaticon.com/authors/freepik) from www.flaticon.com.

A minimal ES6+ express app boilerplate, with included authentication!

This project is useful if you want to jump right into developing an express application without having to worry about the set-up, if you want to take advantage of the newest JavaScript ES6+ syntax, if you are at a hackathon and need to begin coding as soon as possible, or if you simply want to learn how to make your own boilerplate!

Feel free to fork the project, or submit pull requests if you want to add an interesting or helpful feature!

## Features

- ES6+ syntax available via Babel 7.
- SQL database connectivity (by default set to postgreSQL) with Objection.js used as the ORM, along with Knex.
- Full user register and log in routes and functionality with authentication via Json Web Token and token verification middleware included.
- Testing with Jest and Supertest.
- Import aliases! Use `@` to point to `./src/` and `_root` to point to `./` (the root directory).

## Requirements

This project requires that postgreSQL be installed on the development machine and/or server the app will be hosted on.

When creating migrations, make sure to create the database beforehand to avoid any errors!

## Things to Do Before Use

Create a .env file in the root of the directory, and add the following keys:

```
PG_CONNECT_STRING

JWT_SECRET

PG_DB_NAME



PG_CONNECT_STRING_DEV

JWT_SECRET_DEV

PG_DB_NAME_DEV



PG_CONNECT_STRING_TEST

JWT_SECRET_TEST

PG_DB_NAME_TEST
```

The express app uses a connection string by default, but if you wish to use a connection config object, you can remove those keys and references in the `knexfile.js` and `database.js` files and use the object keys.

## Running the Project

- Run `yarn dev` to launch a development environment with the app running on `localhost:3000` (or the specified port defined in `process.env.PORT`).
- Run `yarn build` to build the project out into the `lib/` folder. The `build` command removes an existing lib/ folder when rebuilding the app.
- Run `yarn start` to build and then start the app from the lib/ folder -- use this for production!
- Run `yarn start:es6` to start the app from the src/ folder in a production environment -- experimental use only! Currently a workaround for hosting on Heroku to bypass the 'babel-node not found' error.
- Run `yarn knex:migrate` (with any additional flags) to run the defined migrations in the db/migrations/ folder.
- Run `yarn knex:rollback` (with any additional flags) to rollback database migrations.

## Husky Hooks

This project boilerplate uses [husky](https://www.npmjs.com/package/husky) to define pre-commit and pre-push hooks, as defined below:

- Pre-commit: runs `yarn lint` which uses eslint to lint all files in the src/ folder.
- Pre-push: runs `yarn test` which runs the `index.test.js` file located in the tests/ folder -- see below for more information.

## Testing

Tests are handled by Jest and API endpoint tests are done through Supertest. Because of the asynchronous nature of JavaScipt testing, test files are imported and run through by the `index.test.js` file inside the tests/ folder.

The code block below is the entire contents of the `index.test.js` file.

```javascript
import serverTests from './server.test';
import userTests from './users.test';

/* eslint-disable jest/valid-describe */

describe('Server Tests', serverTests);
describe('User Tests', userTests);
```

Simply import your tests and then run them in any specified order through describe blocks as shown.

Each test file utilizes the `done()` function to call the next test and so on.

Also located in the tests/ folder is a `databaseSetup.js` file. This file exports two functions:

- `dropAllTables()` is self-explanatory and is called in the `beforeAll()` jest hook in the test file that contains the first tests to run (by default, the `server.test.js` file).
- `closeDatabaseConnection()` is self-explanatory and is called in the `afterAll()` jest hook in the test file that contains the last tests to be run (by default, the `users.test.js` file).

## To-Do/Bug List

Currently getting an error with Jest and the database connection:

```
Jest has detected the following 1 open handle potentially keeping Jest from exiting: "TCPWRAP"
```

Instead of using the `--forceExit` flag with jest, the boilerplate currently calls `process.exit(0)` from `closeDatabaseConnection()`. Currently working on trying to figure out how to resolve this issue.

Medium priority.

---

When terminating the app via SIGINT (`Ctrl + C`) after a request, while the app indeed successfully terminates, the following error appears in the console:

```
Error [ERR_STREAM_WRITE_AFTER_END]: write after end
    at writeAfterEnd (_stream_writable.js:248:12)
    at Socket.Writable.write (_stream_writable.js:296:5)
    at Connection.end (/home/vzhny/Documents/express-boiler/node_modules/pg/lib/connection.js:320:22)
    at Client.end (/home/vzhny/Documents/express-boiler/node_modules/pg/lib/client.js:489:21)
    at process.end (/home/vzhny/Documents/express-boiler/src/db/database.js:58:6)
    at process.emit (events.js:197:13)
```

Research on Google isn't resulting in any useful information on how to deal with this error, but it does not affect app disconnection.

Low priority.
