// const res = require('express/lib/response');
const pool = require('../utils/pool');

module.exports = class Band {
  id;
  name;
  members;
  inception;

  constructor(row) {
    this.id = row.id;
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

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM bands WHERE id=$1', [id]);

    if (!rows[0]) return null;
    const band = new Band(rows[0]);
    return band;
  }

  static async getAllBands() {
    const { rows } = await pool.query('SELECT * FROM bands');
    const bands = rows.map((row) => new Band(row));
    return bands;
  }

  static async updateById(id, updatedBand) {
    const band = await Band.getById(id);
    if (!band) return null;

    const name = updatedBand.name ?? band.name;
    const members = updatedBand.members ?? band.members;
    const inception = updatedBand.inception ?? band.inception;

    const { rows } = await pool.query(
      'UPDATE bands SET name=$1, members=$2, inception=$3 WHERE id=$4 RETURNING *',
      [name, members, inception, id]
    );
    return new Band(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM bands WHERE id=$1 RETURNING *',
      [id]
    );
    if (!rows[0]) return null;
    return new Band(rows[0]);
  }
};
