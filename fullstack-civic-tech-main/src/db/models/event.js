const e = require('express');
const knex = require('../knex');

class Event {
  constructor({ id, user_id, location, date, start, end }) {
    this.id = id;
    this.userId = user_id;
    this.location = location;
    this.date = date;
    this.start = start;
    this.end = end;
  }

  static async list() {
    const query = 'SELECT * FROM events;';
    const { rows } = await knex.raw(query);
    return rows.map((event) => new Event(event));
  }

  static async find(id) {
    const query = 'SELECT * FROM events WHERE id = ?;';
    const args = [id];
    const { rows } = await knex.raw(query, args);
    const user = rows[0];
    return user ? new User(user) : null;
  }

  static async create(userId, location, date, start, end) {
    const query = 'INSERT INTO events (user_id, location, date, start, end) VALUES (?, ?, ?, ?, ?) RETURNING *;';
    const args = [userId, location, date, start, end];
    const { rows } = await knex.raw(query, args);
    const event = rows[0];
    return new Event(event);
  }
}