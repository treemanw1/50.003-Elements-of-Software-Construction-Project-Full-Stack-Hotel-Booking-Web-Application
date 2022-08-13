const express= require('express');
const router= express.Router();
const bcrypt= require('bcryptjs');

const db= require("../db/conn")

const Booking= require("../model/userSchema_booking");
router.use(express.json())
router.post('/book', async (req, res) => {
    
    const {firstname, lastname, phonenumber, emailaddress, creditcardnumber, expirydate, cvv, specialrequests, hotelInfo, roomInfo}= req.body;
    
    if(!firstname || !lastname || !phonenumber || !emailaddress || !creditcardnumber || !expirydate || !cvv || !specialrequests){
        return res.status(422).json({error:"Fill all the required fields!"});
    }
    
    try{
        const bookingExists= await Booking.findOne({emailaddress:emailaddress});
        if(bookingExists){
            return res.status(422).json({error:"Booking has been already created!"})
        }

        const booking= new Booking({firstname, lastname, phonenumber, emailaddress, creditcardnumber, expirydate, cvv, specialrequests, hotelInfo, roomInfo});

        await booking.save();
        res.status(201).json({message:"Booking made succesfully!"});

    } catch(err){
        console.log(err);
    }

});
    

module.exports= router;