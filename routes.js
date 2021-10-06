const axios = require('axios');
const Anime = require('./Anime.js')
const mongoose = require('mongoose');
const seed = require('./seed.js');

async function getUser(request, response) {
  console.log(request.params.email, '<--- REQUEST DOT PARAMS ---<<<')
  const email = request.params.email;

  try {
    const foundAnime = await Anime.find({email: email})
    response.status(200).send(foundAnime)
    console.log('--> FOUND ANIME SUCCESS! <--')
  } catch (error) {
    response.status(400);
    console.log('--> COULD NOT FIND ANIME <--')
  }
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

async function postAnime(request, response) {
  try{
    const animeInfo = request.body;
    console.log(request.body, '---> REQUEST DOT PARAMS <---')
    const newAnime = await Anime.create({
      title: animeInfo.title,
      description: animeInfo.synopsis,
      image_url: animeInfo.image_url,
      episodes: animeInfo.episodes,
      score: animeInfo.score,
      rating: animeInfo.rated,
      email: animeInfo.email
    })
    response.status(201).send(newAnime)
} catch (error) {
  console.log('Post anime error')
  response.status(500).send('Failed to post anime')
}}

module.exports = {getUser, getAnime, deleteAnime, postAnime}