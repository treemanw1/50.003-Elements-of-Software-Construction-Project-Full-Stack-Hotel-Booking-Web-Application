const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

  const destinationSchema = new mongoose.Schema({
    term: String,
    uid: String,
    lat: Number,
    lng: Number,
    type: String,
  })

destinationSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// module.exports = mongoose.model('Note')
module.exports = mongoose.model('Destination', destinationSchema)