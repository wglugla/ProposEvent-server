import express from 'express';
const router = express.Router();

import userController from '../controllers/userController';

router.get('/users', async (req, res) => {
  try {
    const data = await userController.getAllUsers();
    res.send({
      status: true,
      data
    })
  } catch (err) {
    res.send({
      status: false,
      error: `${err}`
    })
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const data = await userController.getUserById(req.params.id);
    res.send({
      status: true,
      data
    })
  } catch (err) {
    res.send({
      status: false,
      error: `${err}`
    })
  }
});

export default router;