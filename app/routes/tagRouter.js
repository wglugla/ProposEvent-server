import express from 'express';
const router = express.Router();

import tagController from '../controllers/tagController';

router.get('/tags', async (req, res) => {
  try {
    const data = await tagController.getAllTags();
    res.send({
      status: true,
      data
    })
  } catch (err) {
    res.send({
      status: false,
      error: `${err}`
    });
  }
});

router.get('/tags/:id', async (req, res) => {
  try {
    const data = await tagController.getTagById(req.params.id);
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