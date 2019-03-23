import express from 'express';
import auth from '../middleware/auth';
const router = express.Router();

import eventController from '../controllers/eventController';

router.get('/events', auth.ensureToken, async (req, res) => {
  try {
    const data = await eventController.getAllEvents();
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

router.get('/events/:id', auth.ensureToken, async (req, res) => {
  try {
    const data = await eventController.getEventById(req.params.id);
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

router.post('/events/create', auth.ensureToken, async (req, res) => {
  try {
    const newEvent = await eventController.createEvent(req.body);
    await eventController.addTagsToEvent(newEvent.event_id, req.body);
    await eventController.addMember({
      user_id: req.body.owner_id,
      event_id: newEvent.event_id,
    });
    res.send({
      status: true,
      data: 'Event created',
    });
  } catch (error) {
    res.send({
      status: false,
      error: `${error}`,
    });
  }
});

router.post('/events/modify/:id', auth.verifyEventOwner, async (req, res) => {
  req.body.event_id = req.params.id;
  try {
    await eventController.modifyEvent(req.body);
    await eventController.removeTagsFromEvent(req.params.id);
    await eventController.addTagsToEvent(req.params.id, req.body);
    res.send({
      status: true,
      data: 'Event modified!',
    });
  } catch (error) {
    res.send({
      status: false,
      error: `${error}`,
    });
  }
});

router.post('/events/addmember', auth.ensureToken, async (req, res) => {
  try {
    await eventController.addMember(req.body);
    res.send({
      status: true,
      data: 'User added',
    });
  } catch (error) {
    res.send({
      status: false,
      error: `${error}`,
    });
  }
});

router.post('/events/removemember', auth.ensureToken, async (req, res) => {
  try {
    await eventController.removeMember(req.body);
    res.send({
      status: true,
      data: 'User removed',
    });
  } catch (error) {
    res.send({
      status: false,
      error: `${error}`,
    });
  }
});

export default router;
