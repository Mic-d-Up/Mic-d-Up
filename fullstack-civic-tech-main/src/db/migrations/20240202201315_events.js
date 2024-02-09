/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable('events', (table) => {
  table.increments();
  table.integer('username').notNullable();
  table.foreign('username').references('username').inTable('users');
  table.text('name').notNullable();
  table.text('location').notNullable();
  table.date('date').notNullable();
  table.time('start_time').notNullable();
  table.time('end_time').notNullable();
  table.text('ticket_link');
  table.timestamps(true, true);
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('events');
