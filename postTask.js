const MongoClient = require('mongodb').MongoClient;
const { renderFile } = require('ejs');
const multer = require('multer');
const generateTaskId = require('./generatetask');

const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'ElderlyCareSupport';
const collectionName = 'Tasks';

async function  postTask(elderlyId,taskname , description,typeofcare,preferredschedule,location,durationOfCare,preferredgender,languageRequirements,additionalInformation,deadline)
{
    const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
       
        
        TID = await generateTaskId();
        // Insert the new user into the database
        //const elderuser = await collection.insertOne({ TID,taskname , description,typeofcare,preferredschedule,location,durationOfCare,preferredgender,languageRequirements,additionalInformation,deadline});
        //return true;   
        const tasks = [
            {
                taskId: TID,
                elderlyId: elderlyId,
                taskName: taskname,
                description: description,
                preferredGenderOfVolunteer: preferredgender,
                volunteeremail: 'yogeshwaranmanohar70@gmail.com',
                location: location,
                typeofcare: typeofcare,
                Schedule : preferredschedule,
                Duration : durationOfCare,
                deadline : deadline,
                additionalInformation : additionalInformation,
                createdAt: new Date().now,
                updatedAt: new Date(),

            },
            // Add more task objects as needed
        ];

        // Create the collection by inserting documents into it
        const res = await db.collection(collectionName).insertMany(tasks);
        return res;
        
    }
 catch (err) {
        console.error('Error processing registration:', err);
        return 'Internal Server Error';
    } finally {
        await client.close();
    }
}

module.exports = postTask;
