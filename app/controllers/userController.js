import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import tagController from './tagController';
require('dotenv').config();

import models from '../models/index';
import eventController from './eventController';

export default {
  /* select * from users */
  async getAllUsers() {
    try {
      return await models.User.findAll({
        attributes: ['user_id', 'username', 'name', 'surname'],
      });
    } catch (error) {
      throw error;
    }
  },

  /* select * from users where id */
  async getUserById(id) {
    try {
      const target = await models.User.findOne({
        where: { user_id: id },
        attributes: ['user_id', 'username', 'name', 'surname'],
        include: [
          {
            model: models.UsersTag,
            as: 'user_tags',
          },
        ],
      });
      const eventsCreated = await models.Event.findAndCountAll({
        where: {
          owner_id: id,
        },
      });
      const eventsMember = await models.UsersEvent.findAndCountAll({
        where: {
          user_id: id,
        },
      });
      let userTags = [];
      try {
        for (const tag of target.user_tags) {
          const tagName = await tagController.getTagById(tag.dataValues.tag_id);
          tagName = tagName.value;
          userTags.push(tagName);
        }
        delete target.dataValues.user_tags;
        target.dataValues.user_tags = JSON.stringify(userTags);
      } catch (error) {
        throw error;
      }
      target.dataValues.eventsCreated = eventsCreated.count;
      target.dataValues.eventsSigned = eventsMember.count;
      if (!target) throw 'Nie znaleziono!';
      return target;
    } catch (error) {
      throw error;
    }
  },

  async getUserEvents(id) {
    try {
      const events = await models.Event.findAll({
        where: {
          owner_id: id,
        },
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
          el.dataValues.event_tags = JSON.stringify(eventTags);
        } catch (error) {
          throw error;
        }
      }
      return events;
    } catch (error) {
      throw error;
    }
  },

  async getUserSignedEvents(id) {
    try {
      let list = [];
      const data = await models.UsersEvent.findAll({
        where: {
          user_id: id,
        },
      });
      for (const el of data) {
        let event = await models.Event.findOne({
          where: {
            event_id: el.dataValues.event_id,
          },
          include: [
            {
              model: models.EventsTag,
              as: 'event_tags',
            },
          ],
        });
        let eventTags = [];
        try {
          for (const tag of event.event_tags) {
            const tagName = await tagController.getTagById(
              tag.dataValues.tag_id
            );
            tagName = tagName.value;
            eventTags.push(tagName);
          }
          delete event.dataValues.event_tags;
          event.dataValues.event_tags = JSON.stringify(eventTags);
        } catch (error) {
          throw error;
        }
        list.push(event);
      }
      return list;
    } catch (error) {
      throw error;
    }
  },

  /* insert into Users */
  async registerUser(user) {
    const { username, name, surname, password, tags } = user;

    const newUser = {
      username,
      name,
      surname,
      password,
    };

    const schema = Joi.object().keys({
      username: Joi.string()
        .min(5)
        .max(45)
        .required(),
      name: Joi.string()
        .min(5)
        .max(20)
        .required(),
      surname: Joi.string()
        .min(5)
        .max(20)
        .required(),
      password: Joi.string()
        .required()
        .regex(/^[a-zA-Z0-9[!@#\$%\^&]{5,20}$/),
      tags: Joi.string().required(),
    });

    Joi.validate(user, schema, (err, val) => {
      if (err) throw 'Wprowadzone dane są niepoprawne!';
    });

    bcrypt.hash(password, 8, function(err, hash) {
      if (err) throw err;
      newUser.password = hash;
    });

    let result;
    try {
      result = await models.User.findAll({
        where: {
          username,
        },
      });
      if (result.length) {
        throw new Error('Użytkownik już istnieje!');
      } else {
        let newTags = tags.split(',');
        for (const el of newTags) {
          if (el.length) {
            try {
              const checktag = await models.Tag.findOne({
                where: {
                  value: el,
                },
              });
              if (!checktag) {
                throw 'Użyty tag nie istnieje!';
              }
            } catch (error) {
              throw error;
            }
          }
        }

        return await models.User.create({
          username: newUser.username,
          name: newUser.name,
          surname: newUser.surname,
          password: newUser.password,
        });
      }
    } catch (error) {
      throw error;
    }
  },

  /* add tags to user */
  async addTagsToUser(username, req) {
    const schema = Joi.object().keys({
      tags: Joi.string().required(),
    });
    Joi.validate(req.body, schema, (err, val) => {
      if (err) throw 'Wprowadzono niepoprawne dane!';
    });
    let { tags } = req;
    try {
      const target = await models.User.findOne({
        where: {
          username,
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
            await models.UsersTag.create({
              user_id: target.user_id,
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

  /* select, then return jwt token */
  async authUser(user) {
    const { username, password } = user;
    try {
      const target = await models.User.findOne({
        where: {
          username,
        },
      });
      if (!target) {
        throw 'Niepoprawny login lub hasło!';
      }
      const userPassword = target.dataValues.password;
      const result = await bcrypt.compare(password, userPassword);
      if (result) {
        const token = jwt.sign(
          {
            user_id: target.user_id,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: '24h',
          }
        );
        const userId = target.user_id;
        return { token, userId };
      }
    } catch (error) {
      throw error;
    }
  },
  async suggestEvents(userId, tags) {
    try {
      let events = await eventController.getAllEvents();
      let signedEvents = await this.getUserSignedEvents(userId);
      let signedEventsId = signedEvents.map(event => event.event_id);
      events = events.filter(event => !signedEventsId.includes(event.event_id));
      events.forEach(event => {
        const eventTags = JSON.parse(event.dataValues.event_tags);
        let counter = 0;
        tags.forEach(tag => {
          if (eventTags.includes(tag)) counter++;
        });
        event.dataValues.accuracyPercentage =
          tags.length > tags.length
            ? (counter / eventTags.length) * 100
            : (counter / tags.length) * 100;
      });
      return events;
    } catch (error) {
      throw error;
    }
  },
};
