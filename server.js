const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log("Database Connection Error: ", err));

// API to get scripts by category
app.get('/api/scripts/:category', async (req, res) => {
    const scripts = await require('./models/Script').find({ category: req.params.category });
    res.json(scripts);
});

// API to get a single script detail
app.get('/api/script-detail/:id', async (req, res) => {
    const script = await require('./models/Script').findById(req.params.id);
    res.json(script);
});

const PORT = 5002;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});