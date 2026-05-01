const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Script = require('./models/Script'); // আপনার তৈরি করা মডেল ফাইল

dotenv.config();

// মঙ্গোডিবি কানেকশন
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected for Seeding..."))
  .catch(err => console.log(err));

// JSON ফাইল থেকে ডাটা পড়া
const scripts = JSON.parse(fs.readFileSync(`${__dirname}/scripts.json`, 'utf-8'));

// ডাটাবেসে ইমপোর্ট করার ফাংশন
const importData = async () => {
    try {
        await Script.insertMany(scripts); // একবারে সব ডাটা ঢুকে যাবে
        console.log('Data Successfully Imported! ✅');
        process.exit();
    } catch (err) {
        console.error('Error with importing data:', err);
        process.exit(1);
    }
};

// ডাটা ডিলিট করার ফাংশন (যদি প্রয়োজন হয়)
const deleteData = async () => {
    try {
        await Script.deleteMany();
        console.log('Data Successfully Deleted! 🗑️');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

// টার্মিনাল কমান্ড চেক করা
if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}