const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// মিডলওয়্যার
app.use(cors());
app.use(express.json());

// ১. মঙ্গোডিবি কানেকশন
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected... ✅"))
  .catch(err => console.log("Database Connection Error: ❌", err));

// স্ক্রিপ্ট মডেল
const Script = require('./models/Script');

// ২. API রুটগুলো
app.get('/api/scripts/:category', async (req, res) => {
    try {
        const scripts = await Script.find({ category: req.params.category });
        res.json(scripts);
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
});

app.get('/api/script-detail/:id', async (req, res) => {
    try {
        const script = await Script.findById(req.params.id);
        res.json(script);
    } catch (err) {
        res.status(500).json({ error: "Script not found" });
    }
});

// ৩. ফ্রন্টএন্ড ফাইল সার্ভ করা (এখানই মূল পরিবর্তন)
// আপনার ফোল্ডারের নাম 'public', তাই এখানে 'public' ই দিতে হবে
app.use(express.static(path.join(__dirname, 'public')));

// ৪. মেইন রুট (index.html পাঠানোর জন্য)
app.get('*all', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ৫. পোর্ট সেটিংস
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT} 🚀`);
});