# Express Boiler

![Pot Logo](pot_logo.png 'Pot Logo')

Icon made by [Freepik](https://www.flaticon.com/authors/freepik) from www.flaticon.com.

![Travis (.org)](https://img.shields.io/travis/vzhny/express-boiler.svg?color=%232B7D0C&style=for-the-badge)
![David](https://img.shields.io/david/vzhny/express-boiler.svg?color=%232B7D0C&style=for-the-badge)
![David](https://img.shields.io/david/dev/vzhny/express-boiler.svg?color=%232B7D0C&style=for-the-badge)
![Codacy grade](https://img.shields.io/codacy/grade/8f256d9c6d054f288b944db2ae2d151b.svg?color=%232B7D0C&style=for-the-badge)

A minimal ES6+ express app boilerplate, with included authentication!

This project is useful if you want to jump right into developing an express application without having to worry about the set-up, if you want to take advantage of the newest JavaScript ES6+ syntax, if you are at a hackathon and need to begin coding as soon as possible, or if you simply want to learn how to make your own boilerplate!

Feel free to fork the project, or submit pull requests if you want to add an interesting or helpful feature!

## Features

  - ES6+ syntax available via Babel 7.
  - SQL database connectivity (by default set to postgreSQL) with Objection.js used as the ORM, along with Knex as the query builder.
  - User register and log in routes included with full authentication functionality via Json Web Token (token verification middleware also included).
  - Integration testing done with Jest and Supertest.
  - Import aliases! Use `@` to point to `./src/` and `_root` to point to `./` (the root directory).

## Requirements

This project requires that postgreSQL be installed on the development machine and/or server the app will be hosted on. A global install of knex is not neccessary.

When creating migrations, make sure to create the database beforehand to avoid any errors!

## Things to Do Before Use

Create a .env file in the root of the directory, and add the following keys with their respective values:

```env
PG_CONNECT_STRING_DEV

JWT_SECRET_DEV

PG_DB_NAME_DEV

PG_CONNECT_STRING_TEST

JWT_SECRET_TEST

PG_DB_NAME_TEST
```

Some helpful tips:

  - A valid postgres connection string format is as follows: `postgres://[username]:[password]@[host]:[port]/[database-name]`.
  - Generate a 256-bit secret using the node REPL: `node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"`.
  - The database name will be displayed as console output for better readability.

## Running the Project

  - Run `yarn dev` to launch a development environment with the app running on `localhost:3000` (or the specified port defined in `process.env.PORT`).
  - Run `yarn build` to build the project out into the `dist/lib/` folder. The `build` command removes an existing dist/ folder when rebuilding the app.
  - Run `yarn start` to build and then start the app from the `dist/lib/` folder -- use this for production!
  - Run `yarn start:es6` to start the app from the src/ folder in a production environment -- experimental use only! Currently a workaround for hosting on Heroku to bypass the 'babel-node not found' error.
  - Run `yarn knex` (with any of the standard knex arguments such as migrate:make) to run the local install of knex if it is not installed globally.

## Husky Hooks

This project boilerplate uses [husky](https://www.npmjs.com/package/husky) to define pre-commit and pre-push hooks, as defined below:

  - Pre-commit: runs `yarn lint` which uses eslint to lint all files in the src/ folder.
  - Pre-push: runs `yarn test` which runs the `index.test.js` file located in the tests/ folder -- see below for more information.

## Testing

Tests are handled by Jest and API endpoint tests are done through Supertest. Because of the asynchronous nature of JavaScipt testing, test files are imported and run through by the `index.test.js` file inside the tests/ folder.

The code block below is the entire contents of the `index.test.js` file.

```javascript
import serverTests from '@/tests/server.test';
import userTests from '@/tests/users.test';
import { rollbackAndMigrate, disconnectFromDatabase } from '@/db/database';

/* eslint-disable jest/valid-describe */
beforeAll(() => rollbackAndMigrate());

afterAll(() => disconnectFromDatabase());

describe('Server Tests', serverTests);
describe('User Tests', userTests);
```

Simply import your tests and then run them in any specified order through describe blocks as shown.

Each test file utilizes the `done()` function to call the next test and so on.

Imported into the `index.test.js` file are two helper functions from the `database.js` file:

  - `rollbackAndMigrate()` is self-explanatory and is called before any tests are ran.
  - `disconnectFromDatabase()` is self-explanatory and is called after every single test has finished running.

## To-Do/Bug List

After running `yarn start`, while the express app builds and runs successfully, the following error occurs:

```javascript
An error occurred when rolling back, migrating, or seeding the database. /home/vzhny/Documents/express-boiler/knexfile.js:1
import { knexSnakeCaseMappers } from 'objection';
       ^

SyntaxError: Unexpected token {...
```

Prior to this error, the exact same error was occurring, but with `import {} from 'dotenv/config';`, which was solved by importing dotenv in a different manner. Currently looking for an answer as to why this error gets thrown.

Low priority.
