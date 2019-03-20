exports.up = knex => {
  return knex.schema.createTable('users', table => {
    table.increments('id');
    table.string('userId').notNullable();
    table.string('firstName', 32).notNullable();
    table.string('lastName', 32).notNullable();
    table.string('email', 32).notNullable();
    table.string('password').notNullable();
    table
      .timestamp('createdAt')
      .defaultTo(knex.fn.now())
      .notNull();

    table.unique('userId');
    table.unique('email');
  });
};

exports.down = knex => knex.schema.dropTable('users');
