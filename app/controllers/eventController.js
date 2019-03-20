import models from '../models/index';
import Joi from 'joi';

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

  async createEvent(event) {
    const {
      owner_id,
      place,
      date,
      description,
      tags
    } = event;

    try {
      const schema = Joi.object().keys({
        owner_id: Joi.number().required(),
        place: Joi.string()
          .min(5)
          .max(45)
          .required(),
        date: Joi.date().required(),
        description: Joi.string()
          .min(5)
          .max(255)
          .required(),
        tags: Joi.string().required()
      });
      Joi.validate(event, schema, (err, val) => {
        if (err) throw err;
      });
      let newTags = tags.split(',');
      for (const el of newTags) {
        try {
          const checktag = await models.Tag.findOne({
            where: {
              value: el
            }
          });
          if (!checktag) {
            throw 'Tag not exists!';
          }
        } catch (error) {
          throw error;
        }
      }

      return await models.Event.create({
        owner_id: owner_id,
        place: place,
        date: date,
        description: description
      });
    } catch (err) {
      throw new Error(err);
    }
  },

  /* add tags to event */
  async addTagsToEvent(event_id, req) {
    let {
      tags
    } = req;
    try {
      const target = await models.Event.findOne({
        where: {
          event_id
        }
      });
      tags = tags.split(',');
      for (const tag of tags) {
        try {
          const newTag = await models.Tag.findOne({
            where: {
              value: tag
            }
          });
          const newTagId = newTag.dataValues.tag_id;
          if (newTagId) {
            await models.EventsTag.create({
              event_id: target.event_id,
              tag_id: newTagId
            })
          }
        } catch (error) {
          throw error;
        }
      }
    } catch (error) {
      throw error;
    }
  },
};