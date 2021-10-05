'use strict'

require('dotenv').config()

const express = require('express');
const cors = require('cors');
const { response } = require('express');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const handlerFunctions = require('./routes.js')

const PORT = process.env.PORT;

const app = express();
app.use(express.json())
app.use(cors());

app.get('/', (request, response) => {
  response.send('GEORGE WAS HERE')
});

app.get('/anime', handlerFunctions.getAnime);

app.delete('/anime/:id', handlerFunctions.deleteAnime);

app.get('/user', handlerFunctions.getUser);
app.get('/anime', handlerFunctions.getAnime);

app.listen(PORT, () => console.log(`listening on Port ${PORT}`))