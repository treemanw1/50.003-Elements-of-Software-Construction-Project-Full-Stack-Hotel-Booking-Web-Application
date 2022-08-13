global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;
const mongoose= require('mongoose');

const DB= process.env.DATABASE;

mongoose.connect(DB).then(() => {
    console.log(`Connection Succesful`);
}).catch((err) => console.log(err));