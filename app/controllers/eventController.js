import models from '../models/index';

export default {
  /* List of events in table Events (event id, owner id, place, date, description */
  async getAllEvents() {
    try {
      return await models.Event.findAll();
    } catch (err) {
      throw new Error(err);
    }
  },
  /* Find event by id in table Events */
  async getEventById(id) {
    try {
      return await models.Event.findByPk(id);
    } catch (err) {
      throw new Error(err);
    }
  },
}