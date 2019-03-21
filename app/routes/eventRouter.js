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
  } catch (error) {
    res.send({
      status: false,
      error: `${error}`
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
  } catch (error) {
    res.send({
      status: false,
      error: `${error}`
    })
  }
});

router.post('/events/create', async (req, res) => {
  try {
    const newEvent = await eventController.createEvent(req.body);
    await eventController.addTagsToEvent(newEvent.event_id, req.body);
    res.send({
      status: true,
      data: 'Event created'
    })
  } catch (error) {
    res.send({
      status: false,
      error: `${error}`
    })
  }
})

router.post('/events/modify/:id', async (req, res) => {
  req.body.event_id = req.params.id;
  try {
    const modifiedEvent = await eventController.modifyEvent(req.body);
    await eventController.removeTagsFromEvent(req.params.id);
    await eventController.addTagsToEvent(req.params.id, req.body);
    res.send({
      status: true,
      data: 'Event modified!'
    })
  } catch (error) {
    res.send({
      status: false,
      error: `${error}`
    })
  }
})

export default router;