import shortId from 'shortid';
import bcrypt from 'bcryptjs';

exports.seed = knex => {
  return knex('users')
    .del()
    .then(() => {
      return knex('users').insert([
        {
          userId: shortId.generate(),
          firstName: 'Jake',
          lastName: 'Peralta',
          email: 'jake@bk99.gov',
          password: bcrypt.hashSync('i_luv_amy', 10),
        },
        {
          userId: shortId.generate(),
          firstName: 'Amy',
          lastName: 'Santiago',
          email: 'amy@bk99.gov',
          password: bcrypt.hashSync('I_love_Jake', 10),
        },
      ]);
    });
};
