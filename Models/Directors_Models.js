const database = require('../DB/connection');

async function Directors() {
    const db = await database();
    return db.collection('director');
}

module.exports = Directors;