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

// স্ক্রিপ্ট মডেল ইমপোর্ট (একবার উপরেই করে রাখা ভালো)
const Script = require('./models/Script');

// ২. আপনার API রুটগুলো (এগুলো সব ফাইল সার্ভিং এর উপরে থাকতে হবে)

// ক্যাটাগরি অনুযায়ী সব স্ক্রিপ্ট পাওয়ার API
app.get('/api/scripts/:category', async (req, res) => {
    try {
        const scripts = await Script.find({ category: req.params.category });
        res.json(scripts);
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
});

// নির্দিষ্ট একটি স্ক্রিপ্টের ডিটেইল পাওয়ার API
app.get('/api/script-detail/:id', async (req, res) => {
    try {
        const script = await Script.findById(req.params.id);
        res.json(script);
    } catch (err) {
        res.status(500).json({ error: "Script not found" });
    }
});

// ৩. ফ্রন্টএন্ড ফাইল সার্ভ করা
// আপনার ফোল্ডারের নাম যদি 'frontend' হয়, তবে এটি ঠিক আছে
app.use(express.static(path.join(__dirname, 'frontend')));

// ৪. মেইন লিঙ্কে গেলে index.html পাঠানো (Catch-all route)
app.get('*all', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// ৫. পোর্ট সেটিংস (Render এর জন্য process.env.PORT খুবই জরুরি)
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT} 🚀`);
});