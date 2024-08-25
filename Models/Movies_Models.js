const database = require('../DB/connection');

async function Movies() {
    const db = await database();
    return db.collection('movies');
}

module.exports = Movies;