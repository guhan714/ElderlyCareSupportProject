const MongoClient = require('mongodb').MongoClient;

const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'ElderlyCareSupport';
const collectionName = 'Elders';

async function  getEldersData()
{
    const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
       // const profilePicture = req.body.profilePicture;
        // Check if the user already exists
        const existingUser = await collection.find().toArray();
        return existingUser;
        
    }
 catch (err) {
        console.error('Error processing registration:', err);
        return 'Internal Server Error';
    } finally {
        await client.close();
    }
}

module.exports = getEldersData;
