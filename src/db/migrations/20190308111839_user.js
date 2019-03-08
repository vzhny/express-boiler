exports.up = knex => {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('userId').notNull();
    table.string('firstName').notNull();
    table.string('lastName').notNull();
    table.string('email').notNull();
    table.string('password').notNull();
    table
      .timestamp('createdAt')
      .defaultTo(knex.fn.now())
      .notNull();

    table.unique('userId');
    table.unique('email');
  });
};

exports.down = knex => knex.schema.dropTable('users');
