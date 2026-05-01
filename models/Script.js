const mongoose = require('mongoose');

const SceneSchema = new mongoose.Schema({
    time: String,
    action: String
});

const ScriptSchema = new mongoose.Schema({
    category: String, // Funny, Emotional, etc.
    title: String,
    thumbnail: String, // Cloudinary URL
    scenes: [SceneSchema]
});

module.exports = mongoose.model('Script', ScriptSchema);