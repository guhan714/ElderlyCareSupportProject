const { MongoClient } = require('mongodb');
const generateTaskId = require('./generatetask');

// Connection URI
const uri = 'mongodb://localhost:27017';

// Database Name
const dbName = 'ElderlyCareSupport';

// Create a new MongoClient
const client = new MongoClient(uri);

async function createCollectionAndInsertDocuments() {
    try {
        // Connect to the MongoDB server
        await client.connect();

        // Specify the database
        const db = client.db(dbName);

        // Specify the collection name (table name)
        const collectionName = 'Tasks';

        // Define task data to be inserted
        const tasks = [
            {
                taskId: generateTaskId(),
                elderlyId: 'ELD2934',
                taskName: 'Task 1',
                description: 'Description of Task 1',
                preferredGenderOfVolunteer: 'Any',
                volunteeremail: 'yogeshwaranmanohar70@gmail.com',
                location: 'Location 2',
                phone: '1234567890',
                createdAt: new Date().now,
                updatedAt: new Date()
            },
            // Add more task objects as needed
        ];

        // Create the collection by inserting documents into it
        await db.collection(collectionName).insertMany(tasks);

        console.log('Documents created successfully.');

    } finally {
        // Close the connection when finished
        await client.close();
    }
}

createCollectionAndInsertDocuments().catch(console.error);
