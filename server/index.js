require('dotenv').config();
const express = require("express");
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
      return {label: c.term, value: c.term};
    });
    console.log("before:", terms.length);
    terms = terms.filter(d => d.value!= undefined && d.label!= undefined); // supposedly removes empty terms
    terms = terms.filter(d => d != undefined);
    // terms = terms.filter(d => d != null);
    console.log("after:", terms.length);

    response.json(terms)
  })
})

// app.get('/api/notes', (request, response) => {
//   console.log('response:', response);
//   Note.find({}).then(notes => {
//     console.log('notes:', notes);
//     response.json(notes)
//   })
// })

app.get('*', (request, response) => {
  response.send('<h1>404 Error</h1>')
})

const PORT = process.env.PORT || 3001;
// const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});