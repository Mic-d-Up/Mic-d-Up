const knex = require('../knex');
const { hashPassword, isValidPassword } = require('../../utils/auth-utils');

class Comment {

  constructor({ id, user_id, event_id, content }) {
    this.id = id;
    this.user_id = user_id;
    this.event_id = event_id;
    this.content = content;
  }

  static async list() {
    const query = 'SELECT * FROM comments';
    const { rows } = await knex.raw(query);
    return rows.map((comment) => new Comment(comment));
  }

  static async find(id) {
    const query = 'SELECT * FROM comments WHERE id = ?';
    const args = [id];
    const { rows } = await knex.raw(query, args);
    const comment = rows[0];
    return comment ? new Comment(comment) : null;
  }

  static async findByUserId(userId) {
    const query = 'SELECT * FROM comments WHERE userId = ?';
    const args = [userId];
    const { rows } = await knex.raw(query, args);
    const comment = rows[0];
    return comment ? new Comment(comment) : null;
  }

  static async create(user_id, event_id, content) {
    console.log(user_id, event_id, content);
    const query = `INSERT INTO comments ("user_id", "event_id", content)
      VALUES (?, ?, ?) RETURNING *`;
    const args = [user_id, event_id, content];
    const { rows } = await knex.raw(query, args);
    const comment = rows[0];
    return new Comment(comment);
  }

  static async deleteAll() {
    return knex.raw('TRUNCATE comments;');
  }

  update = async (content) => {
    const rows = await knex('comments')
      .where({ id: this.id })
      .update({ content })
      .returning('*');

    const updatedContent = rows[0];
    return updatedContent ? new Comment(updatedContent) : null;
  };
}

module.exports = Comment;