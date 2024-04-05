const MongoClient = require('mongodb').MongoClient;
const { renderFile } = require('ejs');
const multer = require('multer');

const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'volunteerPortal';
const collectionName = 'tasks';

async function taskPost(firstname, lastname, dob , email , gender , profilePicture) {
    const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
       // const profilePicture = req.body.profilePicture;
        // Check if the user already exists
        const existingUser = await collection.findOne({ email });
        if (existingUser) {
            return 'User already exists';
        }

        // Insert the new user into the database
        await collection.insertOne({ firstname, lastname, dob, email,gender ,profilePicture : profilePicture.buffer });
        
    }
 catch (err) {
        console.error('Error processing registration:', err);
        return 'Internal Server Error';
    } finally {
        await client.close();
    }
}

module.exports = taskPost;
