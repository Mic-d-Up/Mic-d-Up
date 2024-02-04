const knex = require('../knex');

class Post {
  
  constructor({ id, user_id, content }) {
    this.id = id;
    this.user_id = user_id;
    this.content = content;
  }

  static async list() {
    const query = 'SELECT * FROM posts';
    const { rows } = await knex.raw(query);
    return rows.map((post) => new Post(post));
  }

  static async find(id) {
    const query = 'SELECT * FROM posts WHERE id = ?';
    const args = [id];
    const { rows } = await knex.raw(query, args);
    const post = rows[0];
    return post ? new Post(post) : null;
  }

  static async create(user_id, content) {
    const query = `INSERT INTO posts (user_id, content)
      VALUES (?, ?) RETURNING *`;
    const args = [user_id, content];
    const { rows } = await knex.raw(query, args);
    const post = rows[0];
    return new Post(post);
  }

  static async deleteAll() {
    return knex.raw('TRUNCATE posts;');
  }

  update = async (content) => { 
    const rows = await knex('posts')
      .where({ id: this.id })
      .update({ content })
      .returning('*');

    const updatedPost = rows[0];
    return updatedPost ? new Post(updatedPost) : null;
  };

}

module.exports = Post;
