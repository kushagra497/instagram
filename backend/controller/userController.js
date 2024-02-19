const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {JWT_SECRET ,JWT_EXPIRES_IN}=require("../config/auth");
const BlacklistedToken = require("../model/blacklistedToken");

//signup controller

const signup = async (req, res) => {
    try{
        const {username, email, password, city, gender} = req.body;

        //check if user already exists

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }
        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create new user

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            city,
            gender
        })

        await newUser.save();
        res.status(201).json({message: "User created successfully"});
    }catch(error){
        console.error('Error Sigining up',error);
        res.status(500).json({message: "Internal server error"});
    }
}
const login = async (req, res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message: "Invalid email or password"});
        }

        //check password

        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            return res.status(401).json({message: "Invalid credentials"});
        }

        //generate jwt

        const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
        res.status(200).json({token});
    }catch(error){
        console.error('Error logging in',error);
        res.status(500).json({message: "Internal server error"});
    }
}

const logout = async (req, res) => {
    try{
      const token = req.headers.authorization.split(' ')[1];
      if(!token){
        return res.status(401).json({message: "Unauthorized"});
      }
      await BlacklistedToken.create({token})
      res.status(200).json({message: "Logged out successfully"});

    }catch(error){
        console.error('Error logging out',error);
        res.status(500).json({message: "Internal server error"});
    }
}

module.exports = {
    signup,
    login,
    logout
}