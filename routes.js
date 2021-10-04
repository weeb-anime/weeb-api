const axios = require('axios');

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
  console.log(request, '<---- REQUEST LOG ---<<<');
  const title = request.query;
  try {
    API = process.env.ANIME_API;
    animeResponse = await axios.get(API + '/search/anime?q=' + title)
    response.status(200).send(animeResponse);
    console.log ('--> GET ANIME SUCCESS <---')

  } catch (error) {
    response.status(400).send('no anime found');
    console.log(error, '<---- BIG FAT ERROR ---<<<')
  }
}

module.exports = {getUser, getAnime}