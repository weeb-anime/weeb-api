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
  const title = request.query.q;
  console.log(title, '<---- TITLE LOG ---<<<');
  try {
    API = process.env.ANIME_API;
    animeResponse = await axios.get(API + '/search/anime?q=' + title)
    response.status(200).send(animeResponse.data.info);
    console.log (animeResponse.data.results, '<--- ANIME RESPONSE LOG')

  } catch (error) {
    response.status(400).send('no anime found');
    console.log(error, '<---- BIG FAT ERROR ---<<<')
  }
}

async function deleteAnime(request, response) {
  const id = request.params.id;
  console.log(id, '<---- ID LOG ---<<<');
  if (id) {
    const foundAnime = await Book.findOne({mal_id:id})
    console.log(foundAnime, '<--- FOUND ANIME ---<<<');
  } else {
    console.log('--> NO ANIME FOUND <--')
  }
}

module.exports = {getUser, getAnime, deleteAnime}