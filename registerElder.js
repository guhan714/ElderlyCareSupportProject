const MongoClient = require('mongodb').MongoClient;
const { renderFile } = require('ejs');
const multer = require('multer');
const VolunteerId = require('./ElderlyId');
const ElderId = require('./ElderlyId');
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'ElderlyCareSupport';
const collectionName = 'Elders';

async function  registerElder(firstname, lastname, dob, email, gender, State, Country, aadhar, location, password, confirm_password, door_no, area, Zip, occupation, experience, interests, profilePicture )
{
    const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
       // const profilePicture = req.body.profilePicture;
        // Check if the user already exists
        const existingUser = await collection.findOne({ email });
        if (existingUser) {
            return false;
        }
        else{
            EID = ElderId();
        // Insert the new user into the database
        const elderuser = await collection.insertOne({ EID,firstname, lastname, dob, email, gender, State, Country, aadhar, location, password, confirm_password, door_no, area, Zip, occupation, experience, interests ,profilePicture : profilePicture.buffer });
        return true;   
        }
    }
 catch (err) {
        console.error('Error processing registration:', err);
        return 'Internal Server Error';
    } finally {
        await client.close();
    }
}

module.exports = registerElder;
