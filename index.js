const http = require('http');
const express = require('express');
const serveFile = require('./serveFile'); // Adjust the path as needed
const registerUser = require('./register'); // Adjust the path as needed
const loginUser = require('./login');
const getTasks = require('./getTask');
const getVolunteers = require('./getVolunteers');
const registerElder = require('./registerElder')
const getTasksDashboard = require('./getTasks');
const getEldersData = require('./getElders');
const loginElder = require('./loginElder');
const postTask = require('./postTask');
const multer = require('multer');

const app = express();
const port = 3001;
//const express = require('express');
const session = require('express-session');
const taskPost = require('./tasks');
const { count } = require('console');
const Success = require('./Success');
const getUsersData = require('./getVolunteers');

app.use(session({
    secret: 'ASH712004',
    resave: false,
    saveUninitialized: true
}));


const storage = multer.memoryStorage();
const upload = multer({storage:storage})
app.use(express.urlencoded({ extended: true }));
app.set('view engine' , 'ejs');
app.post('/register', upload.single('profilePicture'), async (req, res) => {
    try {
        const { firstname, lastname, dob, email, gender, State, Country, aadhar, location, password, confirm_password, door_no, area, Zip, occupation, experience, interests } = req.body;

        // Validate form data
        if (!firstname || !lastname || !dob || !email || !gender || !State || !Country || !aadhar || !location || !password || !confirm_password || !door_no || !area || !Zip) {
            return res.status(400).send('Invalid form data');
        }

        const profilePicture = req.file;

        // Process the registration data
        const result = await registerUser(firstname, lastname, dob, email, gender, State, Country, aadhar, location, password, confirm_password, door_no, area, Zip, occupation, experience, interests, profilePicture);

        if (result) {
            return res.redirect('/Volunteer/loader.html'); // Adjust the URL as needed
        } else {
            return res.status(400).send('Some error in storing in the database');
        }
        
    } catch (err) {
        console.error('Error processing registration:', err);
        res.status(500).send('Internal Server Error');
    }
});
app.post('/elderregister', upload.single('profilePicture'), async (req, res) => {
    try {
        const { firstname, lastname, dob, email, gender, State, Country, aadhar, location, password, confirm_password, door_no, area, Zip, occupation, experience, interests } = req.body;

        // Validate form data
        if (!firstname || !lastname || !dob || !email || !gender || !State || !Country || !aadhar || !location || !password || !confirm_password || !door_no || !area || !Zip) {
            return res.status(400).send('Invalid form data');
        }

        const profilePicture = req.file;

        // Process the registration data
        const result = await registerElder(firstname, lastname, dob, email, gender, State, Country, aadhar, location, password, confirm_password, door_no, area, Zip, occupation, experience, interests, profilePicture);

        if (result) {
            return res.redirect('/ElderlyUser/loader.html'); // Adjust the URL as needed
        } 
        else{
            Success("The user has already been registered");
            res.redirect('/ElderlyUser/registration.html');
            }
        
    } catch (err) {
        console.error('Error processing registration:', err);
        return res.status(500).send('Internal Server Error');
    }
});



//login end point
app.post('/volunteerlogin', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send('Invalid form data');
        }

        const result = await loginUser(username, password);
        if(result){
        if (result.email == username && result.password == password) {
            const binaryImageData = result.profilePicture.buffer;
            const base64Image = binaryImageData.toString('base64');
            const tasks = await getTasks(result.email);
            const tk = tasks.length;
            Success('logged in succesfully'); 
            res.render('dashboard', { result, base64Image  ,tasks , tk });
        } else {
           
            Success("Invalid Username or Password....");

            res.redirect('/volunteer/login.html');
            // You can also redirect directly using res.redirect('/login') instead of the script
        }
    }
    else {
        Success("Invalid Username or Password....");
    // You can also redirect directly using res.redirect('/login') instead of the script
    }
    } catch (err) {
        console.error("Error in processing:", err);
        res.status(500).send('Internal Server Error');
    }
});
app.post('/elderlogin', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send('Invalid form data');
        }

        const result = await loginElder(username, password);
        if(result){
        if (result.email == username && result.password == password) {
            const binaryImageData = result.profilePicture.buffer;
            const base64Image = binaryImageData.toString('base64');
            const tasks = await getTasks(result.EID);
            const tk = tasks.length;
            Success('logged in succesfully'); 
            res.render('elder-dashboard', { result, base64Image  ,tasks , tk });
        } 
        else {
            Success("Invalid Username or Password....");
        // You can also redirect directly using res.redirect('/login') instead of the script
        }
    }  
    else {
        Success("Invalid Username or Password bro....");
        res.redirect('ElderlyUser/login.html');
    // You can also redirect directly using res.redirect('/login') instead of the script
    } 
    } catch (err) {
        console.error("Error in processing:", err);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/adminlogin', async (req, res) => {
    try {
        const { username, pass } = req.body;
        if (!username || !pass) {
            return res.status(400).send('Invalid form data');
        }

        const result = {'username' : 'admin107' , 'password' : 'adminthala07'};
        if (result['username'] == username && result['password'] == pass) {
            
            Success('logged in succesfully'); 
            
            const volunteers = await getUsersData();
            const tasks = await getTasksDashboard();
            const Elders = await getEldersData();
            res.render('admin-dashboard', { volunteers,tasks , Elders});
        } else {
            
            res.redirect('/admin/login.html');
            // You can also redirect directly using res.redirect('/login') instead of the script
        }
    } catch (err) {
        console.error("Error in processing:", err);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/posteldertask', async (req, res) => {
    try {
        const { elderlyId, taskname, description, typeofcare, preferredschedule, location, durationOfCare, preferredgender, languageRequirements, additionalInformation, deadline } = req.body;

        // Validate form data
        if (!elderlyId || !taskname || !description || !typeofcare || !preferredschedule || !location || !durationOfCare || !preferredgender || !languageRequirements || !additionalInformation || !deadline) {
            return res.status(400).send('Invalid form data');
        }

        // Process the registration data
        const result = await postTask(elderlyId, taskname, description, typeofcare, preferredschedule, location, durationOfCare, preferredgender, languageRequirements, additionalInformation, deadline);
        if (result)
            res.status(200).send('Task posted Successfully');

    } catch (err) {
        console.error('Error processing registration:', err);
        return res.status(500).send('Internal Server Error');
    }
});


// Serve HTML pages for any other routes
app.use((req, res) => {
    serveFile(req, res);
});

http.createServer(app).listen(port);

console.log(`Server running on port ${port}`);
