const axios = require('axios');
const Anime = require('./Anime.js')
const mongoose = require('mongoose');
const seed = require('./seed.js');

function getUser(request, response) {
  verifyUser(request, (error, user) => {
    if (error) {
      response.send('invalid token');
    } else {
      response.send(user);
    }
  })
}

async function getAnime(request, response) {
  const query = request.query.q;
  console.log(query, '<---- QUERY LOG ---<<<');
  try {
    API = process.env.ANIME_API;
    animeResponse = await axios.get(API + '/search/anime?q=' + query);
    const animeArray = animeResponse.data.results;
    response.status(200).send(animeArray);

  } catch (error) {
    response.status(400).send('no anime found');
    console.log(error, '<---- BIG FAT ERROR ---<<<');
  }
}

// !! IMPORTANT !! SEED NEEDS TO BE CALLED BEFORE MONGOOSE DOT CONNECT B/C SEED HAS A DISCONNECT INSIDE !! IMPORTANT !! 
mongoose.connect(process.env.MONGODB_URI);

async function deleteAnime(request, response) {
  const id = request.params.id;
  console.log(id, '<---- ID LOG ---<<<');
  if (id) {
    const foundAnime = await Anime.findOne({mal_id:id})
    console.log(foundAnime, '<--- FOUND ANIME ---<<<');
  } 

  try {
    await Anime.findByIdAndDelete(id);
    response.status(202).send('Anime Succesfully Deleted')
    console.log('---> Anime Succesfully Deleted <---')
  } catch (error) {
    console.log('---> DELETE ANIME ERROR LOG <---');
    response.status(500).send('No Anime to Delete!')
  }
}

module.exports = {getUser, getAnime, deleteAnime}