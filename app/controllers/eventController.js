import db from '../config/database';

export default {
  /* List of events in table Events (event id, owner id, place, date, description */
  async getAllEvents() {
    try {
      return await db.query('SELECT * FROM Events');
    } catch (err) {
      throw new Error(err);
    }
  },
  /* Find event by id in table Events */
  async getEventById(id) {
    try {
      return await db.query(`SELECT * FROM Events WHERE event_id=${id}`)
    } catch (err) {
      throw new Error(err);
    }
  },
}