const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url);
const dbName = 'accessLogs';

let db;

async function connectMongoDb() {
    if (!db) {
        await client.connect();
        db = client.db(dbName);
        console.log('Connected to MongoDB...');
    }
    return db;
}

module.exports = { connectMongoDb };