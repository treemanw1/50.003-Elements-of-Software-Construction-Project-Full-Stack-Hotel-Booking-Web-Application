const express = require("express");
const cors = require('cors');

const PORT = process.env.PORT || 3001;
const Note = require('../models/mongo')

const app = express();
app.use(cors());

let destinations = [
  {
    id: 1,
    destination: "Japan"
  },
  {
    id: 2,
    destination: "Korea"
  },
  {
    id: 3,
    destination: "Singapore"
  },
  {
    id: 4,
    destination: "Taiwan"
  }
]

app.get("/", (request, response) => {
  response.send('<h1>Backend front page</h1>')
});

// app.get('/api/destinations', function(req, res) {
//   res.json(destinations);
//   });

app.get('/api/destinations', (request, response) => {
  console.log('response:', response);
  Note.find({}).then(notes => {
    console.log('notes:', notes);
    response.json(notes)
  })
})

app.get('*', (request, response) => {
  response.send('<h1>404 Error</h1>')
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});