const mongoose= require('mongoose');

const DB= process.env.DATABASE;
const db2= process.env.MONGODB_URI;

mongoose.connect(DB).then(() => {
    console.log(`Connection Succesful`);
}).catch((err) => console.log(err));

// mongoose.connect(db2).then(() => {
//     console.log(`Connection Succesful`);
// }).catch((err) => console.log(err));
