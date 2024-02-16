const Event = require('../models/event');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async (knex) => {
  await Event.create('1', 'Queens', '02/14/2024', '19:00', '22:00');
};
