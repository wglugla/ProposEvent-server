import db from '../config/database';

export default {
  /* List of tags in table Tags (id, value) */
  async getAllTags() {
    try {
      return await db.query('SELECT * FROM Tags');
    } catch (err) {
      throw new Error(err);
    }
  },
  /* Find tag by id in table Tags */
  async getTagById(id) {
    try {
      return await db.query(`SELECT * FROM Tags WHERE tag_id=${id}`)
    } catch (err) {
      throw new Error(err);
    }
  }

}