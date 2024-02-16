const knex = require('../knex');
const { hashPassword, isValidPassword } = require('../../utils/auth-utils');

class User {
  #passwordHash = null;

  constructor({ id, username, password_hash, name, profile_pic, artist_type }) {
    this.id = id;
    this.username = username;
    this.#passwordHash = password_hash;
    this.name = name;
    this.profile_pic = profile_pic;
    this.artist_type = artist_type;
  }

  static async list() {
    const query = 'SELECT * FROM users';
    const { rows } = await knex.raw(query);
    return rows.map((user) => new User(user));
  }

  static async find(id) {
    const query = 'SELECT * FROM users WHERE id = ?';
    const args = [id];
    const { rows } = await knex.raw(query, args);
    const user = rows[0];
    return user ? new User(user) : null;
  }

  static async findByUsername(username) {
    const query = 'SELECT * FROM users WHERE username = ?';
    const args = [username];
    const { rows } = await knex.raw(query, args);
    const user = rows[0];
    return user ? new User(user) : null;
  }

  static async create(username, password, name, profile_pic, artist_type) {
    const passwordHash = await hashPassword(password);

    const query = `INSERT INTO users (username, password_hash, name, profile_pic, artist_type)
      VALUES (?, ?, ?, ?, ?) RETURNING *`;
    const args = [username, passwordHash, name, profile_pic, artist_type];
    const { rows } = await knex.raw(query, args);
    const user = rows[0];
    return new User(user);
  }

  static async deleteAll() {
    return knex.raw('TRUNCATE users;');
  }

  update = async (username) => {
    const rows = await knex('users')
      .where({ id: this.id })
      .update({ username })
      .returning('*');

    const updatedUser = rows[0];
    return updatedUser ? new User(updatedUser) : null;
  };

  isValidPassword = async (password) => (
    isValidPassword(password, this.#passwordHash)
  );
}

module.exports = User;
