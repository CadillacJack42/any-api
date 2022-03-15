const pool = require('../utils/pool');

module.exports = class Band {
  id;
  name;
  members;
  inception;

  constructor(row) {
    this.name = row.name;
    this.members = row.members;
    this.inception = row.inception;
  }

  static async insert({ name, members, inception }) {
    const { rows } = await pool.query(
      'INSERT INTO bands(name, members, inception) VALUES ($1, $2, $3) RETURNING *',
      [name, members, inception]
    );
    const band = new Band(rows[0]);
    return band;
  }
};
