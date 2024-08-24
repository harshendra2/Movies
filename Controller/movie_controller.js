const database=require('../DB/connection');
const bcrypt=require('bcryptjs');

exports.UserRegister = async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const userData = {
            email: email,
            password: hashedPassword
        };
        const db = await database(); 
        const usersCollection = db.collection('users'); 
        
        const RegData = await usersCollection.insertOne(userData);

        if (RegData.acknowledged) { 
            return res.status(200).json({ message: "User Registration Successfully" });
        } else {
            return res.status(500).json({ error: "Failed to register user" });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};