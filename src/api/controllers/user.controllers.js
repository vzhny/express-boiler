import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import shortId from 'shortid';
import User from '../../models/user.model';

/* eslint-disable consistent-return */

const env = process.env.NODE_ENV;

// POST register route controller
export const register = (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (password.length <= 6) {
    return res.status(400).json({
      message: 'Please enter a password with a length of 6 or more characters.',
    });
  }

  User.query()
    .insert({
      userId: shortId.generate(),
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, 10),
    })
    .then(user => {
      const { userId } = user;

      const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: 86400 });

      return res.status(201).json({
        firstName,
        lastName,
        token,
      });
    })
    .catch(error => {
      return res.status(400).json({
        message: 'There was an error registering, please try again.',
        error: env !== 'production' ? error : {},
      });
    });
};

// POST login route controller
export const login = (req, res) => {
  const { email, password } = req.body;

  User.query()
    .select()
    .where('email', email)
    .first()
    .then(user => {
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
    })
    .catch(error => {
      return res.status(404).json({
        message: 'Could not find user or wrong password. Please try again.',
        error: env !== 'production' ? error : {},
      });
    });
};
