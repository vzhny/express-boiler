import request from 'supertest';
import to from 'await-to-js';
import app from '@/app';
import server from '@/server';
import { repository } from '_root/package.json';

/* eslint-disable consistent-return */

beforeEach(() => {
  server.close();
});

const serverTests = () => {
  describe('GET /', () => {
    it('should send the correct message to check the documentation', async done => {
      const [error, res] = await to(request(app).get('/'));

      if (error) {
        const { message } = error;
        done(message);
      }

      const { status, text } = res;

      expect(status).toEqual(200);
      expect(text).toEqual(`Please go to ${repository} for API usage information.`);

      done();
    });
  });
};

export default serverTests;
