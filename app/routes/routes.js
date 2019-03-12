import express from 'express';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import {
  getAllTags
} from '../controllers/controller';

const router = express.Router();

router.get('/tags', async (req, res) => {
  try {
    const data = await getAllTags();
    res.send({
      status: true,
      data
    })
  } catch (err) {
    res.send({
      status: false,
      err
    });
  }

});

export default router;