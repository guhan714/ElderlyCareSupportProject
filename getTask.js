const { MongoClient } = require('mongodb');

const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'ElderlyCareSupport';
const collectionName = 'Tasks';

async function getTasks(EID) {

    let client;
    try {
        // Connect to MongoDB
        client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(dbName);
        
        // Get the tasks collection
        const tasksCollection = db.collection(collectionName);
        const rows = await tasksCollection.countDocuments();
        // Fetch tasks from the tasks collection
        const tasks = await tasksCollection.find({elderlyId:EID}).toArray();
        
        return tasks;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    } finally {
        // Close the client connection
        if (client) {
            await client.close();
        }
    }
}

module.exports = getTasks;
