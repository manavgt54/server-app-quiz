const express = require('express');
const router = express.Router();
const Form = require('../models/Form');
const Response = require('../models/Response');

// CREATE a new form
router.post('/create', async (req, res) => {
  try {
    const form = new Form(req.body);
    const savedForm = await form.save();
    res.status(201).json(savedForm);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET all forms
router.get('/', async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single form by ID
router.get('/:id', async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) return res.status(404).json({ message: 'Form not found' });
    res.json(form);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// SUBMIT form responses and save them
router.post('/:id/submit', async (req, res) => {
  try {
    const formId = req.params.id;
    const answers = req.body;

    const form = await Form.findById(formId);
    if (!form) return res.status(404).json({ message: 'Form not found' });

    const response = new Response({ formId, answers });
    await response.save();

    res.json({ message: 'Response saved successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
