const express= require('express');
const app= express();
const mongoose= require('mongoose');
const dotenv= require('dotenv');

app.use(express.json());

dotenv.config({path: "./config.env"});
require('./db/conn');
// const User= require('./model/userSchema');

app.use(require('./router/auth'));
app.use(require('./router/booking'));

const PORT= process.env.PORT;


//middleware 

const middleware= (req, res, next) =>{
    //next();
}


app.get('/hoteldetails', middleware, (req, res) => {
    res.send(`Hotel Details`);
});




app.get('/userdetails', middleware, (req, res) => {
    res.send(`User Details`);
});

// app.get('/', (req, res) => {
//     res.send(`Hello world`);
// });

// app.get('/register', (req, res) => {
//     res.send(`Register`);
// });

// app.get('/login', middleware, (req, res) => {c
//     res.send(`Log in`);
// });

// app.get('/book', middleware, (req, res) => {
//     res.send(`Book`);
// });

app.listen(PORT, () => {
    console.log(`Our server is running at Port ${PORT}`);
});


