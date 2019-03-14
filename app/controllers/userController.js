import db from '../config/database';
import bcrypt from 'bcryptjs';

export default {
  /* List of users in table Users (username, name, surname, registration date) */
  async getAllUsers() {
    try {
      return await db.query('SELECT * FROM Users');
    } catch (err) {
      throw err;
    }
  },
  /* Find user by id in table Users */
  async getUserById(id) {
    try {
      return await db.query(`SELECT * FROM Users WHERE user_id=${id}`)
    } catch (err) {
      throw err;
    }
  },
  /* Add new user to database */
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
      result = await db.query(`SELECT * FROM Users WHERE username='${username}'`);
      if (result.length) {
        throw new Error('User already exists');
      } else {
        return await db.query(`INSERT INTO Users (username, name, surname, password) VALUES ('${newUser.username}', '${newUser.name}', '${newUser.surname}', '${newUser.password}')`);
      }
    } catch (err) {
      throw new Error(err);
    }
  },
  async authUser(user) {
    const {
      username,
      password
    } = user;
    const target = await db.query(`SELECT password FROM Users WHERE username='${username}'`);
    const userPassword = target[0].password;
    console.log('userPassword: ', userPassword);
    const result = await bcrypt.compare(
      password,
      userPassword
    );
    return result;
  }
}