import express from 'express';
import auth from '../middleware/auth';

const router = express.Router();

import userController from '../controllers/userController';
import eventController from '../controllers/eventController';

router.get('/users', auth.ensureToken, async (req, res) => {
  try {
    const data = await userController.getAllUsers();
    res.send({
      status: true,
      data,
    });
  } catch (error) {
    res.send({
      status: false,
      error: `${error}`,
    });
  }
});

router.get('/users/:id', auth.ensureToken, async (req, res) => {
  try {
    const data = await userController.getUserById(req.params.id);
    res.send({
      status: true,
      data,
    });
  } catch (error) {
    res.send({
      status: false,
      error: `${error}`,
    });
  }
});

router.get('/users/:id/events', auth.ensureToken, async (req, res) => {
  try {
    const data = await userController.getUserEvents(req.params.id);
    res.send({
      status: true,
      data,
    });
  } catch (error) {
    res.send({
      status: false,
      error: `${error}`,
    });
  }
});

router.get('/users/:id/signedEvents', auth.verifyUser, async (req, res) => {
  try {
    const data = await userController.getUserSignedEvents(req.params.id);
    res.send({
      status: true,
      data,
    });
  } catch (error) {
    res.send({
      status: false,
      error: `${error}`,
    });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const newUser = await userController.registerUser(req.body);
    await userController.addTagsToUser(newUser.username, req.body);
    res.send({
      status: true,
      data: 'User registered',
    });
  } catch (error) {
    res.send({
      status: false,
      error: `${error}`,
    });
  }
});

router.post('/signin', async (req, res) => {
  try {
    const data = await userController.authUser(req.body);
    if (!data) throw 'incorrect username or password';
    res.send({
      status: true,
      data: 'Success',
      token: data.token,
      userId: data.userId,
    });
  } catch (error) {
    res.send({
      status: false,
      message: `${error}`,
    });
  }
});

router.get('/user/:id/events/suggested', auth.ensureToken, async (req, res) => {
  const { id } = req.params;
  const tags = JSON.parse(req.query.tags);
  const tagsArray = JSON.parse(tags);
  try {
    let events = await userController.suggestEvents(id, tagsArray);
    res.send({
      status: true,
      data: events,
    });
  } catch (error) {
    res.send({
      status: false,
      error: `${error}`,
    });
  }
});

export default router;
