import bcrypt from 'bcryptjs';

import models from '../models/index';

export default {
  async getAllUsers() {
    try {
      return await models.User.findAll();
    } catch (error) {
      throw error;
    }
  },
  async getUserById(id) {
    try {
      return await models.User.findByPk(id);
    } catch (error) {
      throw error;
    }
  },


  async registerUser(user) {
    const {
      username,
      name,
      surname,
      password
    } = user;
    const newUser = {
      username,
      name,
      surname,
      password
    }
    bcrypt.hash(password, 8, function (err, hash) {
      if (err) throw err;
      newUser.password = hash;
    });
    /* validation here */
    /* TODO: */
    let result
    try {
      result = await models.User.findAll({
        where: {
          username
        }
      })
      if (result.length) {
        throw new Error('User already exists');
      } else {
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
      console.log('target');
      if (!target) {
        throw 'Incorrect login or password';
      }
      const userPassword = target.dataValues.password;
      const result = await bcrypt.compare(
        password,
        userPassword
      );
      return result;
    } catch (error) {
      throw error;
    }

  }
}