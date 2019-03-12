import express from 'express';
const router = express.Router();

import eventController from '../controllers/eventController';

router.get('/events', async (req, res) => {
  try {
    const data = await eventController.getAllEvents();
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

router.get('/events/:id', async (req, res) => {
  try {
    const data = await eventController.getEventById(req.params.id);
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