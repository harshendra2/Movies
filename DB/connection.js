const { MongoClient } = require('mongodb');

// Replace with your MongoDB connection string
const uri =process.env.DATABASE;

const client = new MongoClient(uri); // No need for useNewUrlParser and useUnifiedTopology options

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db('your_database_name'); // Replace with your database name
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
}

module.exports = connectToDatabase;

