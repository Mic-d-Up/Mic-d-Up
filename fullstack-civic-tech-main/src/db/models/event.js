/* eslint-disable no-dupe-class-members */
// const e = require('express');
const knex = require('../knex');

class Event {
  constructor({ id, name, user_id, location, date, start_time, end_time, ticket_link }) {
    this.id = id;
    this.name = name;
    this.user_id = user_id;
    this.location = location;
    this.date = date;
    this.startTime = start_time;
    this.endTime = end_time;
    this.ticket_link = ticket_link;
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

  static async create(name, user_id, location, date, start_time, end_time, ticket_link) {
    const query = 'INSERT INTO events (name, "user_id", location, date, start_time, end_time, ticket_link) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING *;';
    const args = [name, user_id, location, date, start_time, end_time, ticket_link];
    const { rows } = await knex.raw(query, args);
    const event = rows[0];
    console.log('eventModel', event);
    return new Event(event);
  }

  // eslint-disable-next-line no-dupe-class-members
  static async joinEvent(user_id, event_id) {
    const query = 'INSERT INTO "Event_Users" ( "user_id","event_id") VALUES (?, ?) RETURNING *;';
    const args = [user_id, event_id];
    const { rows } = await knex.raw(query, args);
    const Event_User = rows[0];
    console.log('Event_User', Event_User);
    return Event_User;
  }

  static async leaveEvent(user_id, event_id) {
    const query = 'DELETE FROM "Event_Users" WHERE user_id = ? AND event_id = ? RETURNING event_id;';
    const args = [user_id, event_id];
    const { rows } = await knex.raw(query, args);
    const Event_User = rows[0];
    console.log('Event_User', Event_User);
    return Event_User;
  }
}

module.exports = Event;
