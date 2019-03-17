import express from 'express';
import auth from '../middleware/auth';

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
    const newUser = await userController.registerUser(req.body);
    await userController.addTagsToUser(newUser.username, req.body);
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
    const token = await userController.authUser(req.body);
    if (!token) throw 'incorrect username or password';
    res.send({
      status: true,
      data: 'Success',
      token
    })
  } catch (error) {
    res.send({
      status: false,
      error: `${error}`
    })
  }
});

router.get("/test", auth.ensureToken, (req, res, next) => {
  res.render('index', {
    title: 'Express'
  })
})


export default router;