const Post = require('../models/post');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  await Post.create('1', '#coachella');
  await Post.create('2', 'this concert was lit');
  await Post.create('3', '#friday');
};
