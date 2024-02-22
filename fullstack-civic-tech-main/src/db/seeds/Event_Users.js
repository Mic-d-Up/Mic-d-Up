/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('Event_Users').del();
  await knex('Event_Users').insert([
    { user_id: 1, event_id: 1 },
  ]);
};
