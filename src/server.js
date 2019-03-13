import app from '@/app';

const env = process.env.NODE_ENV;
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  if (env !== 'test') {
    console.log(`Server listening on port ${port}.`);
  }
});

export default server;
