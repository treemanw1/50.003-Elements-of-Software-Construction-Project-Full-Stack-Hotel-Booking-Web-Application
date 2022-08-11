const jwt= require("jsonwebtoken")
const User= require("../model/userSchema");


const Authenticate= async (req, res, next) => {
    try{
        
        const emailaddress = req.body.emailaddress;
        // const verifyToken= jwt.verify(token, process.env.SECRET_KEY);

        const rootUser= await User.findOne({emailaddress:emailaddress});

        if (!rootUser) {throw new Error('User not found') }

        // req.token= token;
        req.rootUser= rootUser;
        req.userID= rootUser._id;

        next();

    } catch(err){
        res.status(401).send("Unauthorized")
        console.log(err)
    }
}

module.exports= Authenticate