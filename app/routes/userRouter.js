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
  } catch (error) {
    res.send({
      status: false,
      error: `${error}`
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
  } catch (error) {
    res.send({
      status: false,
      error: `${error}`
    })
  }
});

router.post('/signup', async (req, res) => {
  try {
    await userController.registerUser(req.body);
    res.send({
      status: true,
      data: 'User registered'
    })
  } catch (error) {
    res.send({
      status: false,
      error: `${error}`
    })
  }
});

router.post('/signin', async (req, res) => {
  try {
    const result = await userController.authUser(req.body);
    if (result) {
      res.send({
        status: true,
        data: 'Success'
      })
    } else {
      res.send({
        status: true,
        error: 'No auth!'
      })
    }

  } catch (error) {
    res.send({
      status: false,
      error: `${error}`
    })
  }
});

export default router;