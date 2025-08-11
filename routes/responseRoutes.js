const express = require('express');
const router = express.Router();
const Response = require('../models/Response');

// POST /api/responses/:formId/submit
router.post('/:formId/submit', async (req, res) => {
  try {
    const newResponse = new Response({
      formId: req.params.formId,
      answers: req.body.answers,
    });
    const savedResponse = await newResponse.save();
    res.status(201).json(savedResponse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
