/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable('Event_Users', (table) => {
  table.increments('id').primary();
  table.integer('user_id').unsigned().notNullable().references('id')
    .inTable('users')
    .onDelete('CASCADE');
  table.integer('event_id').unsigned().notNullable().references('id')
    .inTable('events')
    .onDelete('CASCADE');
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('Event_Users');
