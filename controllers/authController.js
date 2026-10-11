const User = require('../models/User');
const bcrypt = require('bcryptjs');
const {makeToken} = require('../utils/makeToken');
exports.register=async (req, res, next) => {
    try {
    const {name, email, password,confirmPassword} = req.body;

    if(!name){
        return res.status(400).json({message: "Name not found"});
    }

    if(!email){
        return res.status(400).json({message: "Email not found"});
    }

    if(!password || !confirmPassword){
        return res.status(400).json({message: "enter Password and confirm Password"});
    }


    if(password !== confirmPassword){
        return res.status(400).json({message: "Passwords do not match"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });
    res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email   
    });
}
catch (error) {
    next(error);
}
}


exports.login = async (req, res, next) => {
    try{
    const { email, password } = req.body;

    if(!email){
        return res.status(400).json({
            message: "Email not found"
        });
    }


    if(!password){
        return res.status(400).json({
            message: "Password not found"
        });
    }
    
    if(password.length < 8){
        return res.status(400).json({
            message: "Password must be at least 8 characters"
        });
    }

    const user = await User.findOne({email}).select("+password");
    if(!user){
        return res.status(400).json({
            message: "User doesnt exist"
        });
    }
    
    const ok = await bcrypt.compare(password, user.password);

    if(!ok){
        return res.status(400).json({
            message: "Invalid credentials"
        });
    }
    res.status(200).json({
        token : makeToken(user)
    })
    }catch (error) {
        next(error);
    }
}
    