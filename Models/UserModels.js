const database = require('../DB/connection');

async function User() {
    const db = await database();
    const usersCollection = db.collection('users');
    return usersCollection;
}

module.exports = User;
