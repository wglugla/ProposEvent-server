import models from '../models/index';

export default {
  /* List of tags in table Tags (id, value) */
  async getAllTags() {
    try {
      return await models.Tag.findAll();
    } catch (err) {
      throw new Error(err);
    }
  },
  async getTagById(id) {
    try {
      return await models.Tag.findByPk(id);
    } catch (err) {
      throw new Error(err);
    }
  },
};
