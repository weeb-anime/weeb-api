// const mongoose = require('mongoose');
// require('dotenv').config();

// async function seed(animeArray) {
//   await mongoose.connect(process.env.MONGODB_URI);
//   const Anime = require('./Anime.js');
//   const animeInfo = animeArray;
//   for (let i = 0; i < animeInfo.length; i++) {
//     try {
//       await Anime.create({
//         title: animeInfo[i].title,
//         description: animeInfo[i].synopsis,
//         image_url: animeInfo[i].image_url,
//         episodes: animeInfo[i].episodes,
//         score: animeInfo[i].score,
//         rating: animeInfo[i].rated
//       })
//     } catch (error) {
//       console.log(error, '<-- SEED ERROR LOG -<<')
//     }
//   };
//   mongoose.disconnect();
// }

// module.exports = seed;