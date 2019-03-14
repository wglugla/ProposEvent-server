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

router.post('/signup', async (req, res) => {
  try {
    const data = await userController.registerUser(req.body);
    console.log('DATA: ', data);
    res.send({
      status: true,
      data: 'User registered'
    })
  } catch (err) {
    res.send({
      status: false,
      error: `${err}`
    })
  }
});

router.post('/signin', async (req, res) => {
  try {
    const result = await userController.authUser(req.body);
    console.log('RESULT ZWROCONY: ', result);
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

  } catch (err) {
    res.send({
      status: false,
      error: `${err}`
    })
  }
});

export default router;