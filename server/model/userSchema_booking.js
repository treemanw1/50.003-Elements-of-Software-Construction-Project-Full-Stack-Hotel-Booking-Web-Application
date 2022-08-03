const mongoose= require('mongoose');
const bcrypt= require('bcryptjs');

const userSchema_bookingdetails= new mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    phonenumber:{
        type: Number,
        required: true
    },
    emailaddress:{
        type: String,
        required: true
    },
    creditcardnumber:{
        type: String,
        required: true
    },
    expirydate:{
        type: String,
        required: true
    },
    cvv:{
        type:String,
        required: true
    }

 

})


userSchema_bookingdetails.pre('save', async function(next) {
    if(this.isModified('creditcardnumber')) {
        this.creditcardnumber= await bcrypt.hash(this.creditcardnumber, 12);
        this.expirydate= await bcrypt.hash(this.expirydate, 12);
        this.cvv= await bcrypt.hash(this.cvv, 12);
    }
    next();
})

const Booking = mongoose.model('BOOKING', userSchema_bookingdetails);
//const Booking= mongoose.model('BOOKING', userSchema_bookingdetails)


module.exports = Booking;
