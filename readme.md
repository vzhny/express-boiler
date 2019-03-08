# Express Boiler

![Pot Logo](pot_logo.png 'Pot Logo')

Icon made by [Freepik](https://www.flaticon.com/authors/freepik) from www.flaticon.com.

A minimal ES6+ express app boilerplate, with included authentication!

## Features

- ES6+ syntax available via Babel 7.
- SQL database connectivity (by default set to postgreSQL) with Objection.js used as the ORM, along with Knex.
- Full user register and log in routes and functionality with authentication via Json Web Token and token verification middleware included.
- Testing with Jest and Supertest.

## Things to Do Before Use

Create a .env file in the root of the directory, and add the following keys:

```
PG_HOST_DEV
PG_USER_DEV
PG_PASSWORD_DEV
PG_DATABASE_DEV

PG_CONNECT_STRING

JWT_SECRET

PG_DB_NAME

PG_HOST_DEV
PG_USER_DEV
PG_PASSWORD_DEV
PG_DATABASE_DEV

PG_CONNECT_STRING_DEV

JWT_SECRET_DEV

PG_DB_NAME_DEV

PG_HOST_TEST
PG_USER_TEST
PG_PASSWORD_TEST
PG_DATABASE_TEST

PG_CONNECT_STRING_TEST

JWT_SECRET_TEST

PG_DB_NAME_TEST
```

The express app uses a connection string by default, but if you wish to use a connection config object, you can remove those keys and references in the `knexfile.js` and `database.js` files and use the object keys.
