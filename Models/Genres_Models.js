const database = require('../DB/connection');

async function Geners() {
    const db = await database();
    return db.collection('genres');
}

module.exports =Geners;