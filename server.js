'use strict'

const express = require('express');
const cors = require('cors');
const { response } = require('express');

const handlerFunctions = require('./routes.js')

require('dotenv').config()

const app = express();

const PORT = process.env.PORT;

app.use(express.json())
app.use(cors());

app.get('/', (request, response) => {
  response.send('GEORGE WAS HERE')
});

app.get('/user', handlerFunctions.getUser);
app.get('/anime', handlerFunction.getAnime)

app.listen(PORT, () => console.log(`listening on Port ${PORT}`))