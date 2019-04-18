import models from '../models/index';
import Joi from 'joi';
import tagController from './tagController';

export default {
  /* List of events in table Events (event id, owner id, place, date, description */
  async getAllEvents() {
    try {
      let events = await models.Event.findAll({
        include: [
          {
            model: models.EventsTag,
            as: 'event_tags',
          },
        ],
      });
      for (let el of events) {
        let eventTags = [];
        try {
          for (const tag of el.event_tags) {
            const tagName = await tagController.getTagById(
              tag.dataValues.tag_id
            );
            tagName = tagName.value;
            eventTags.push(tagName);
          }
          delete el.dataValues.event_tags;
          el.dataValues.event_tags = `${eventTags}`;
        } catch (error) {
          throw error;
        }
      }
      return events;
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
    const { owner_id, title, place, date, description, tags } = event;

    try {
      const schema = Joi.object().keys({
        owner_id: Joi.number().required(),
        title: Joi.string()
          .min(5)
          .max(45)
          .required(),
        place: Joi.string()
          .min(5)
          .max(45)
          .required(),
        date: Joi.date().required(),
        description: Joi.string()
          .min(5)
          .max(255)
          .required(),
        tags: Joi.string().required(),
      });
      Joi.validate(event, schema, (err, val) => {
        if (err) throw err;
      });
      let newTags = tags.split(',');
      for (const el of newTags) {
        try {
          const checktag = await models.Tag.findOne({
            where: {
              value: el,
            },
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
        title: title,
        place: place,
        date: date,
        description: description,
      });
    } catch (err) {
      throw new Error(err);
    }
  },

  /* add tags to event */
  async addTagsToEvent(event_id, req) {
    let { tags } = req;
    try {
      const target = await models.Event.findOne({
        where: {
          event_id,
        },
      });
      tags = tags.split(',');
      for (const tag of tags) {
        try {
          const newTag = await models.Tag.findOne({
            where: {
              value: tag,
            },
          });
          const newTagId = newTag.dataValues.tag_id;
          if (newTagId) {
            await models.EventsTag.create({
              event_id: target.event_id,
              tag_id: newTagId,
            });
          }
        } catch (error) {
          throw error;
        }
      }
    } catch (error) {
      throw error;
    }
  },

  async modifyEvent(event) {
    const { event_id, owner_id, place, date, description, tags } = event;

    try {
      const schema = Joi.object().keys({
        event_id: Joi.number().required(),
        owner_id: Joi.number().required(),
        title: Joi.string()
          .min(5)
          .max(45)
          .required(),
        place: Joi.string()
          .min(5)
          .max(45)
          .required(),
        date: Joi.date().required(),
        description: Joi.string()
          .min(5)
          .max(255)
          .required(),
        tags: Joi.string().required(),
      });
      Joi.validate(event, schema, (err, val) => {
        if (err) throw err;
      });
      let newTags = tags.split(',');
      for (const el of newTags) {
        try {
          const checktag = await models.Tag.findOne({
            where: {
              value: el,
            },
          });
          if (!checktag) {
            throw 'Tag not exists!';
          }
        } catch (error) {
          throw error;
        }
      }

      return await models.Event.update(
        {
          owner_id: owner_id,
          title: title,
          place: place,
          date: date,
          description: description,
        },
        {
          where: {
            event_id,
          },
        }
      );
    } catch (error) {
      throw new Error(error);
    }
  },

  async removeTagsFromEvent(event_id) {
    try {
      return await models.EventsTag.destroy({
        where: {
          event_id,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  },

  async addMember(body) {
    const { user_id, event_id } = body;
    try {
      const schema = Joi.object().keys({
        user_id: Joi.number().required(),
        event_id: Joi.number().required(),
      });
      Joi.validate(body, schema, (err, val) => {
        if (err) throw err;
      });
      const exist = await models.UsersEvent.findAll({
        where: {
          user_id,
          event_id,
        },
      });
      if (exist.length) {
        throw 'User is already member of this event!';
      }
      return await models.UsersEvent.create({
        user_id,
        event_id,
      });
    } catch (error) {
      throw new Error(error);
    }
  },

  async removeMember(body) {
    const { user_id, event_id } = body;
    try {
      const schema = Joi.object().keys({
        user_id: Joi.number().required(),
        event_id: Joi.number().required(),
      });
      Joi.validate(body, schema, (err, val) => {
        if (err) throw err;
      });
      const exist = await models.UsersEvent.findAll({
        where: {
          user_id,
          event_id,
        },
      });
      if (!exist.length) {
        throw 'User is not a member of this event!';
      }
      return await models.UsersEvent.destroy({
        where: {
          user_id,
          event_id,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  },
};
