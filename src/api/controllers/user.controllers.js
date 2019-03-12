import to from 'await-to-js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import shortId from 'shortid';
import User from '../../models/user.model';

/* eslint-disable consistent-return */

const env = process.env.NODE_ENV;

// POST register route controller
export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (password.length <= 6) {
    return res.status(400).json({
      message: 'Please enter a password with a length of 6 or more characters.',
    });
  }

  const [error, user] = await to(
    User.query().insert({
      userId: shortId.generate(),
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, 10),
    })
  );

  if (error) {
    return res.status(400).json({
      message: 'There was an error registering, please try again.',
      error: env !== 'production' ? error : {},
    });
  }

  const { userId } = user;

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' });

  return res.status(201).json({
    firstName,
    lastName,
    token,
  });
};

// POST login route controller
export const login = async (req, res) => {
  const { email, password } = req.body;

  const [error, user] = await to(
    User.query()
      .select()
      .where('email', email)
      .first()
  );

  if (error) {
    return res.status(404).json({
      message: 'Could not find user or wrong password. Please try again.',
      error: env !== 'production' ? error : {},
    });
  }

  const { firstName, lastName, userId } = user;

  if (!user) {
    return res.status(404).json({
      message: 'Could not find user or wrong password. Please try again.',
    });
  }

  if (bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: 86400 });

    return res.status(200).json({
      firstName,
      lastName,
      token,
    });
  }

  return res.status(404).json({
    message: 'Could not find user or wrong password. Please try again.',
  });
};
