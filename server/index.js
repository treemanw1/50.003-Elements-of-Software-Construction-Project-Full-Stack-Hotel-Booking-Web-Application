require('dotenv').config();
const express = require("express");
const fetch = require('node-fetch');
const cors = require('cors');

const Destination = require('../models/destination');
const { remove } = require('../models/destination');
// const Note = require('../models/note')

const app = express();
app.use(cors());

app.get("/", (request, response) => {
  response.send('<h1>Backend front page</h1>')
});

app.get('/api/destinations', (request, response) => {
  Destination.find({}).then(destinations => {
    // console.log('destinations length:', destinations.length);
    var terms = destinations.map(function (c) {
      return {label: c.term, value: c.term, uid: c.uid};
    });
    // console.log("before:", terms.length);
    // remove empty terms
    terms = terms.filter(d => d.value!= undefined && d.label!= undefined);
    terms = terms.filter(d => d != undefined);
    // // remove duplicates (takes a bit too long)
    var terms = terms.filter((arr, index, self) =>
    index === self.findIndex((t) => (t.label === arr.label && t.value === arr.value)))

    // console.log("after:", terms.length);
    response.json(terms)
  })
})

app.get('/api/hotels/:id', async (req, res) => {
  try {
    const apiResponse = await fetch(`https://hotelapi.loyalty.dev/api/hotels?destination_id=${req.params.id}`);
    const apiResponseJson = await apiResponse.json()
    console.log(apiResponseJson)
    res.json(apiResponseJson)
  } catch (err) {
    console.log(err)
    res.status(500).send('Something went wrong')
  }
})

app.get('*', (request, response) => {
  response.send('<h1>404 Error</h1>')
})

const PORT = process.env.PORT || 3001;
// const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
