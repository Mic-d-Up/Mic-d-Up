const User = require('../models/user');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  await knex('users').del();
  await User.create('cool_cat', '1234', 'e', 'text', 'rapper');
  await User.create('l33t-guy', '1234', 'r', 'text', 'singer');
  await User.create('wowow', '1234', 'i', 'text', 'beatboxer');
};