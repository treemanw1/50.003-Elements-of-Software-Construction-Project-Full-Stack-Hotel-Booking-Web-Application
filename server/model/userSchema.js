const mongoose= require('mongoose');
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');

const userSchema= new mongoose.Schema({
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
    password:{
        type: String,
        required: true
    },
    confirmpassword:{
        type: String,
        required: true
    },
    tokens:[
        {
            token: {
                type:String,
                required:true
            }
        }
    ]
 

})


userSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
        this.password= await bcrypt.hash(this.password, 12);
        this.confirmpassword= await bcrypt.hash(this.confirmpassword, 12);
    }
    next();
})

userSchema.methods.generateAuthToken= async function() {
    try{
        let token= jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens= this.tokens.concat({token:token});
        await this.save();
        return token;

    } catch(err){
        console.log(err);
    }
}

const User = mongoose.model('USER', userSchema);
//const Booking= mongoose.model('BOOKING', userSchema_bookingdetails);

module.exports = User; //User
