const e = require('express');
const knex = require('../knex');

class Event {
  constructor({ id, user_id, location, date, start_time, end_time }) {
    this.id = id;
    this.userId = user_id;
    this.location = location;
    this.date = date;
    this.start_time = start_time;
    this.end_time = end_time;
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
    const event = rows[0];
    return event ? new Event(event) : null;
  }

  static async create(userId, location, date, start_time, end_time) {
    const query = 'INSERT INTO events (user_id, location, date, start_time, end_time) VALUES (?, ?, ?, ?, ?) RETURNING *;';
    const args = [userId, location, date, start_time, end_time];
    const { rows } = await knex.raw(query, args);
    const event = rows[0];
    return new Event(event);
  }
}