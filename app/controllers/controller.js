import db from '../config/database';

export const getAllTags = async () => {
  try {
    let result = await db.query('SELECT * FROM Tags');
    return result;
  } catch (err) {
    throw new Error(err);
  }
}