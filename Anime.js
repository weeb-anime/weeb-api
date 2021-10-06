const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI);

const { Schema } = mongoose;

const animeSchema = new Schema({
    title: String,
    description: String,
    image_url: String,
    episodes: Number,
    score: Number,
    rating: String
});

const Anime = mongoose.model('Anime', animeSchema);

module.exports = Anime;