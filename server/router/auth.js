const express= require('express');
const router= express.Router();
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');

const authenticate = require("../middleware/authenticate");

require("../db/conn");
const User= require("../model/userSchema");
// const { default: App } = require('../../client/src/App');
// const User= userschema.User;

router.get('/', (req, res) => {
    res.send(`Hello world from the server ~Router.js`);
});

// adding data through promises
// router.post('/register', (req, res) => {
    
//     const {firstname, lastname, phonenumber, emailaddress, password, confirmpassword }= req.body;
    
//     if(!firstname || !lastname || !phonenumber || !emailaddress || !password || !confirmpassword){
//         return res.status(422).json({error:"Fill all the required fields"});
//     }



//     User.findOne({emailaddress:emailaddress})
//         .then((userExists) => {
//         if(userExists){
//             return res.status(422).json({error:"Email already exists!"});
//         }

//         const user= new User({firstname, lastname, phonenumber, emailaddress, password, confirmpassword});

//         user.save().then(() => {
//             res.status(201).json({message:"User registered succesfully"})
//         }).catch((err) => res.status(500).json({error: "Failed to register succesfully"}))
//     }).catch(err => {console.log(err); });
// });

router.post('/register', async (req, res) => {
    
    const {firstname, lastname, phonenumber, emailaddress, password, confirmpassword }= req.body;
    
    if(!firstname || !lastname || !phonenumber || !emailaddress || !password || !confirmpassword){
        return res.status(422).json({error:"Fill all the required fields!"});
    }
    
    try{
        const userExists= await User.findOne({emailaddress:emailaddress});
        if(userExists){
            return res.status(422).json({error:"User with given email already exists!"});
        } else if(password != confirmpassword){
            return res.status(422).json({error:"Password and Confirm Password fields not the same!"});
        } else{
            const user= new User({firstname, lastname, phonenumber, emailaddress, password, confirmpassword});
            
            await user.save();
            res.status(201).json({message:"User registered succesfully!"});
        }

        

    } catch(err){
        console.log(err);
    }
    
});

//login workflow

router.post('/login', async (req, res) => {
    try{
        let token;
        const {emailaddress, password} = req.body;
        if(!emailaddress || !password){
            return res.status(400).json({error:"Please fill all required inputs!"})
        }

        const userLogin= await User.findOne({emailaddress:emailaddress});

        if (userLogin){

            const check= await bcrypt.compare(password, userLogin.password);

            token= await userLogin.generateAuthToken();
            
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now()+6000000000),
                httpOnly:true
            });

            if(!check){
                res.status(400).json({error:"Invalid keyed in credentials!"});
            } else{
                res.json({message:"User Login Successful!"});
            }
        } else{
            res.status(400).json({error:"Invalid keyed in credentials!"});
        }

        



    } catch(err){
        console.log(err);
    }
});

router.get('/book', authenticate, (req, res) => {
    res.send("Hello")
});


module.exports= router;