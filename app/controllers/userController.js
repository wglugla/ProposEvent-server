import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
require('dotenv').config();

import models from '../models/index';

export default {
  /* select * from users */
  async getAllUsers() {
    try {
      return await models.User.findAll();
    } catch (error) {
      throw error;
    }
  },

  /* select * from users where id */
  async getUserById(id) {
    try {
      const target = await models.User.findByPk(id);
      const eventsCreated = await models.Event.findAndCountAll({
        where: {
          owner_id: id
        }
      })
      const eventsMember = await models.UsersEvent.findAndCountAll({
        where: {
          user_id: id
        }
      })
      target.dataValues.eventsCreated = eventsCreated.count;
      target.dataValues.eventsSigned = eventsMember.count;
      if (!target) throw 'Not found';
      return target;
    } catch (error) {
      throw error;
    }
  },

  async getUserEvents(id) {
    try {
      return await models.Event.findAll({
        where: {
          owner_id: id
        }
      })
    } catch (error) {
      throw error;
    }
  },

  async getUserSignedEvents(id) {
    try {
      let list = []
      const data = await models.UsersEvent.findAll({
        where: {
          user_id: id
        }
      });
      for (const el of data) {
        let event = await models.Event.findByPk(el.dataValues.event_id);
        list.push(event);
      }
      return list;
    } catch (error) {
      throw error;
    }
  },

  /* insert into Users */
  async registerUser(user) {
    const {
      username,
      name,
      surname,
      password,
      tags
    } = user;

    const newUser = {
      username,
      name,
      surname,
      password
    }

    const schema = Joi.object().keys({
      username: Joi.string().min(5).max(45).required(),
      name: Joi.string().min(5).max(20).required(),
      surname: Joi.string().min(5).max(20).required(),
      password: Joi.string().required().regex(/^[a-zA-Z0-9]{8,30}$/),
      tags: Joi.string().required(),
    })

    Joi.validate(user, schema, (err, val) => {
      if (err) throw 'Invalid request data';
    })

    bcrypt.hash(password, 8, function (err, hash) {
      if (err) throw err;
      newUser.password = hash;
    });

    let result;
    try {
      result = await models.User.findAll({
        where: {
          username
        }
      })
      if (result.length) {
        throw new Error('User already exists');
      } else {
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

        return await models.User.create({
          username: newUser.username,
          name: newUser.name,
          surname: newUser.surname,
          password: newUser.password
        })
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
      if (err) throw 'Invalid request data';
    })
    console.log('req', req);
    let {
      tags
    } = req;
    try {
      const target = await models.User.findOne({
        where: {
          username
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
            await models.UsersTag.create({
              user_id: target.user_id,
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

  /* select, then return jwt token */
  async authUser(user) {
    const {
      username,
      password
    } = user;
    try {
      const target = await models.User.findOne({
        where: {
          username
        }
      });
      if (!target) {
        throw 'Incorrect login or password';
      }
      const userPassword = target.dataValues.password;
      const result = await bcrypt.compare(
        password,
        userPassword
      );
      if (result) {
        const token = jwt.sign({
          username: username
        }, process.env.SECRET_KEY)
        return token;

      }
    } catch (error) {
      throw error;
    }

  },
}