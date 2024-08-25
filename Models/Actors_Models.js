const database = require('../DB/connection');

async function Actors() {
    const db = await database();
    return db.collection('actors');
}

module.exports = Actors;