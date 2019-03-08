import { Model } from 'objection';

class User extends Model {
  static tableName = 'users';

  static jsonSchema = {
    type: 'object',
    required: ['firstName', 'lastName', 'email', 'password'],

    properties: {
      id: { type: 'serial' },
      userId: { type: 'string' },
      firstName: { type: 'string', minLength: 1, maxLength: 30 },
      lastName: { type: 'string', minLength: 1, maxLength: 30 },
      email: { type: 'string', unique: true },
      password: { type: 'string' },
      createdAt: { type: 'timestamp' },
    },
  };
}

export default User;
