/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable('events', (table) => {
  table.increments();
  table.integer('user_id').notNullable();
  // table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
  table.text('location').notNullable();
  table.date('date').notNullable();
  table.time('start_time').notNullable();
  table.time('end_time').notNullable();
  table.timestamps(true, true);
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('events');
