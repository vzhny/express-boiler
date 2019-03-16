import request from 'supertest';
import app from '@/app';
import server from '@/server';

/* eslint-disable no-unused-expressions */

beforeEach(() => {
  server.close();
});

const userTests = () => {
  let authToken = '';

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully (first user)', async done => {
      const userInformation = {
        firstName: 'Jake',
        lastName: 'Peralta',
        email: 'jake@bk99.gov',
        password: 'i_luv_amy',
      };

      try {
        const { status, body } = await request(app)
          .post('/api/auth/register')
          .send(userInformation);

        const { firstName, lastName, token } = body;

        expect(status).toEqual(201);
        expect(firstName).toEqual('Jake');
        expect(lastName).toEqual('Peralta');
        expect(token).toBeTruthy();

        authToken = token;

        done();
      } catch (error) {
        const { message } = error;
        done(message);
      }
    });

    it('should register a new user successfully (second  user)', async done => {
      const userInformation = {
        firstName: 'Amy',
        lastName: 'Santiago',
        email: 'amy@bk99.gov',
        password: 'I_Love_Jake',
      };

      try {
        const { status, body } = await request(app)
          .post('/api/auth/register')
          .send(userInformation);

        const { firstName, lastName, token } = body;

        expect(status).toEqual(201);
        expect(firstName).toEqual('Amy');
        expect(lastName).toEqual('Santiago');
        expect(token).toBeTruthy();

        done();
      } catch (error) {
        const { message } = error;

        done(message);
      }
    });

    it('should fail the registration of an email already in use', async done => {
      const userInformation = {
        firstName: 'Charles',
        lastName: 'Boyle',
        email: 'jake@bk99.gov',
        password: 'ilovejake',
      };

      try {
        const { status } = await request(app)
          .post('/api/auth/register')
          .send(userInformation);

        expect(status).toEqual(400);

        done();
      } catch (error) {
        const { message } = error;

        done(message);
      }
    });

    it('should enforce a password minimum length of 6 characters', async done => {
      const userInformation = {
        firstName: 'Raymond',
        lastName: 'Holt',
        email: 'captain_holt@bk99.gov',
        password: 'kevin',
      };

      try {
        const { status, body } = await request(app)
          .post('/api/auth/register')
          .send(userInformation);

        const { message } = body;

        expect(status).toEqual(400);
        expect(message).toEqual('Please enter a password with a length of 6 or more characters.');

        done();
      } catch (error) {
        const { message } = error;

        done(message);
      }
    });
  });

  describe('POST /api/auth/login', () => {
    it("should respond with the user's first and last names, a true auth flag and auth token after successfully logging in", async done => {
      const userInformation = {
        email: 'jake@bk99.gov',
        password: 'i_luv_amy',
      };

      try {
        const { status, body } = await request(app)
          .post('/api/auth/login')
          .send(userInformation);

        const { firstName, lastName, token } = body;

        expect(status).toEqual(200);
        expect(firstName).toEqual('Jake');
        expect(lastName).toEqual('Peralta');
        expect(token).toBeTruthy();

        done();
      } catch (error) {
        const { message } = error;

        done(message);
      }
    });

    it('should respond with a general error message when an unregistered email address is entered', async done => {
      const userInformation = {
        email: 'terry@bk99.gov',
        password: 'lacy_and_ava',
      };

      try {
        const { status, body } = await request(app)
          .post('/api/auth/login')
          .send(userInformation);

        const { message } = body;

        expect(status).toEqual(404);
        expect(message).toEqual('Could not find user or wrong password. Please try again.');

        done();
      } catch (error) {
        const { message } = error;

        done(message);
      }
    });

    it('should respond with a general error message when an incorrect password is entered', async done => {
      const userInformation = {
        email: 'amy@bk99.gov',
        password: 'i_love_Jake',
      };

      try {
        const { status, body } = await request(app)
          .post('/api/auth/login')
          .send(userInformation);

        const { message } = body;

        expect(status).toEqual(404);
        expect(message).toEqual('Could not find user or wrong password. Please try again.');

        done();
      } catch (error) {
        const { message } = error;

        done(message);
      }
    });

    it('should respond with a success message if the user was successfully authenticated', async done => {
      try {
        const { status, body } = await request(app)
          .post('/api/authenticated')
          .set('authentication', authToken);

        const { message } = body;

        expect(status).toEqual(200);
        expect(message).toEqual('Authenticated the user successfully!');

        done();
      } catch (error) {
        const { message } = error;

        done(message);
      }
    });

    it('should respond with an error message if no token is provided', async done => {
      try {
        const { status, body } = await request(app).post('/api/authenticated');

        const { message } = body;

        expect(status).toEqual(403);
        expect(message).toEqual('No authentication token was provided.');

        done();
      } catch (error) {
        const { message } = error;

        done(message);
      }
    });

    it('should respond with an error message if the user is not authenticated', async done => {
      try {
        const { status, body } = await request(app)
          .post('/api/authenticated')
          .set('authentication', 'not_valid');

        const { message } = body;

        expect(status).toEqual(500);
        expect(message).toEqual('Failed to authenticate the provided token.');

        done();
      } catch (error) {
        const { message } = error;

        done(message);
      }
    });
  });
};

export default userTests;
