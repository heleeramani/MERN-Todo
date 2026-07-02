const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registration = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Required data missing'
            })
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: 'Email already exist'
            })
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const createUser = await User.create({
            name,
            email,
            password: hashedPass
        });

        return res.status(201).json({
            succes: true,
            message: "User Registered successfully",
            data: createUser
        })
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Required data missing"
            })
        }

        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({
                message: "User not found"
            })
        }

        const token = jwt.sign({
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        })

        return res.status(200).json({
            messgae: "Login Successfully",
            token,
            data: {
                id: user._id,
                email: user.email,
                password: user.password
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server error"
        })
    }
}

module.exports = {
    registration,
    login
}