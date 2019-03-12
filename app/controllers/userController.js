import db from '../config/database';

export default {
  /* List of users in table Users (username, name, surname, registration date) */
  async getAllUsers() {
    try {
      return await db.query('SELECT * FROM Users');
    } catch (err) {
      throw new Error(err);
    }
  },
  /* Find user by id in table Users */
  async getUserById(id) {
    try {
      return await db.query(`SELECT * FROM Users WHERE user_id=${id}`)
    } catch (err) {
      throw new Error(err);
    }
  },
}