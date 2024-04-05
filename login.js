const MongoClient = require('mongodb').MongoClient;

const mongoUrl = 'mongodb+srv://srinivasanguhan30:z3LxGxSID1xvRfaY@elderlycaresupport.zyahnuv.mongodb.net/?retryWrites=true&w=majority&appName=Elderlycaresupport';
const dbName = 'ElderlyCareSupport';
const collectionName = 'Volunteer';

async function loginUser(username, password) {
    const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Check if the user already exists
        const existingUser = await collection.findOne({ email:username});
        if (existingUser) {
            return existingUser;
        }

        // Insert the new user into the database
        else
            return null;
    }
 catch (err) {
        console.error('Error processing Login:', err);
        return 'Internal Server Error';
    } finally {
        await client.close();
    }
}

module.exports = loginUser;
