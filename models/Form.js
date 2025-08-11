const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g., 'categorize', 'cloze', 'comprehension'
  label: { type: String, required: true },
  options: [String],
  correctAnswer: mongoose.Schema.Types.Mixed,
  imageUrl: String
});

const formSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  headerImage: String,
  questions: [questionSchema],
}, { timestamps: true });

module.exports = mongoose.model('Form', formSchema);
