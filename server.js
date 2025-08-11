const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error(err));

// Routes
const formRoutes = require('./routes/formRoutes');
const responseRoutes = require('./routes/responseRoutes');  // Add this line

app.use('/api/forms', formRoutes);
app.use('/api/responses', responseRoutes);                  // Register new route

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
