const { MongoClient } = require('mongodb');


const uri =process.env.DATABASE;

const client = new MongoClient(uri); 

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db('your_database_name');
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
}

module.exports = connectToDatabase;

