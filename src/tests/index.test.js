import serverTests from '@/tests/server.test';
import userTests from '@/tests/users.test';
import { rollbackAndMigrate, closeDatabaseConnection } from '@/tests/databaseSetup';

/* eslint-disable jest/valid-describe */
beforeAll(() => rollbackAndMigrate());

afterAll(() => closeDatabaseConnection());

describe('Server Tests', serverTests);
describe('User Tests', userTests);
