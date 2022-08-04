const express= require('express');
const router= express.Router();
const bcrypt= require('bcryptjs');

const db= require("../db/conn")

const Booking= require("../model/userSchema_booking");

router.post('/book', async (req, res) => {
    
    const {firstname, lastname, phonenumber, emailaddress, creditcardnumber, expirydate, cvv }= req.body;
    
    if(!firstname || !lastname || !phonenumber || !emailaddress || !creditcardnumber || !expirydate || !cvv){
        return res.status(422).json({error:"Fill all the required fields!"});
    }

    if(creditcardnumber.length!= 16 || cvv.length != 3 || !(/^[0-9]+$/.test(creditcardnumber)) || !(/^[0-9]+$/.test(cvv)) || !(/^\d{2}\/\d{2}$/.test(expirydate))){
        return res.status(422).json({error:"Invalid credit card details! Try again."})
    }

    
    try{
        // const bookingExists= await Booking.findOne({emailaddress:emailaddress});
        // if(bookingExists){
        //     return res.status(422).json({error:"Booking has been already created!"})
        // }
        const booking= new Booking({firstname, lastname, phonenumber, emailaddress, creditcardnumber, expirydate, cvv});

        await booking.save();
        res.status(201).json({message:"Booking made succesfully!"});

    } catch(err){
        console.log(err);
    }

});
    

module.exports= router;