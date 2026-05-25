import User from "../models/User.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Resume from "../models/Resume.js";


const generateToken = (userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "7d"})
    return token;
}
export const registerUser = async (req, res) => {
        try {
            const {name,email,password} = req.body;
            //check if required fields are present
            if(!name || !email || !password) {
                return res.status(400).json({message: "Missing required fields"})
            }

            //check if user already exists
            const user = await User.findOne({email})
            if(user) {
                return res.status(400).json({message: "User already exists"})
            }
            //create new user
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({name,email,password: hashedPassword})

            //  return success message
            const token = generateToken(newUser._id)
            newUser.password = undefined;

            return res.status(201).json({message: "User created successfully", user: newUser, token})


        }catch (error) {
            return res.status(400).json({message: error.message})
            
        }
}

// controllers for user resigtration
// POST: /api/users/login
export const loginUser = async (req, res) => {
        try {
            const {name,email,password} = req.body;
            //check if required fields are present
            if( !email || !password) {
                return res.status(400).json({message: "Missing required fields"})
            }

            //check if user  exists
            const user = await User.findOne({email})
            if(!user) {
                return res.status(400).json({message: "Invalid email or password"})
            }
            //check if password is correct
            if(!user.comparePassword(password)) {
                return res.status(400).json({message: "Invalid email or password"})
            }

            //  return success message
            const token = generateToken(user._id)
            user.password = undefined;

            return res.status(200).json({message: "Login successful", user, token})


        }catch (error) {
            return res.status(400).json({message: error.message})
            
        }
}

//controllers for getting user by id
// GET: /api/users/:id
export const getUserById = async (req, res) => {
        try {
            const userId = req.userId;

            //check if user  exists
            const user = await User.findById(userId)
            if(!user) {
                return res.status(400).json({message: 'User not found'})
            }

            // return user data
               user.password = undefined;
               return res.status(200).json({user})


        }catch (error) {
            return res.status(400).json({message: error.message})
            
        }
}

//controllers for getting user resumes
// GET: /api/users/:id/resumes
export const getUserResumes = async (req, res) => {
        try {
            const userId = req.userId;

            //return user resumes
            const resumes = await Resume.find({userId})
            return res.status(200).json({resumes})
        }
        catch (error) {
            return res.status(400).json({message: error.message})
        }
    }