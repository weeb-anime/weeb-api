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
  const title = request.query.searchQuery;
  console.log(title, '<---- TITLE LOG ---<<<');
  try {
    API = process.env.ANIME_API;
    animeResponse = await axios.get(API + '/search/anime?q=' + title)
    response.status(200).send(animeResponse.data.results);
    console.log ('--> GET ANIME SUCCESS <---')

  } catch (error) {
    response.status(400).send('no anime found');
    console.log(error, '<---- BIG FAT ERROR ---<<<')
  }
}

module.exports = {getUser, getAnime}