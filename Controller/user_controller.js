const User = require('../Models/UserModels');
const bcrypt = require('bcryptjs');

exports.UserRegister = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const userData = {
            email: email,
            password: hashedPassword
        };

        const usersCollection = await User();
        const existingUser = await usersCollection.findOne({ email: email });

        if (existingUser) {
            return res.status(400).json({ error: "Email is already registered" });
        }

        const RegData = await usersCollection.insertOne(userData);

        if (RegData.acknowledged) {
            return res.status(200).json({ message: "User Registration Successful" });
        } else {
            return res.status(500).json({ error: "Failed to register user" });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

exports.UserLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const usersCollection = await User();
        const preUser = await usersCollection.findOne({ email: email });

        if (!preUser) {
            return res.status(400).json({ error: "This Email Id is not registered in our Database" });
        }

        const passwordMatch = await bcrypt.compare(password, preUser.password);

        if (passwordMatch) {
            return res.status(200).json({ message: "User Login Successfully" });
        } else {
            return res.status(400).json({ error: "Please Enter correct password" });
        }

    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};
