const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());


// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

//initialize id and users array to store users in memory
let userIdCounter = 1;
const users = {}

//http post request to create new user and generate id for that user
app.post('/users', (req, res) => {
    const {name, email} = req.body;

    if (!name || !email) {
        return res.status(400).json({error: 'name and email are required'});
    }
    const user = {
        id: userIdCounter++,
        name,
        email
    }
    users[user.id] = user;
    res.status(201).json(user);
});

//http get request to get user by id
app.get('/users/:id', (req, res) => {
    const {id} = req.params;
    const user = users[id];
    if (!user) {
        return res.status(404).json({error: 'user not found'});
    }
    res.status(200).json(user);
});

//http put request to update user by id
app.put('/users/:id', (req, res) => {
    const {id} = req.params;
    const {name, email} = req.body;

    if (!name || !email) {
        return res.status(400).json({error: 'name and email are required'});
    }

    if(!users[id]){
        return res.status(404).json({error: 'user not found'});
    }

    const user = {
        id,
        name,
        email
    }

    users[id] = user;
    res.status(200).json(user);
});

//http delete request to delete user by id
app.delete('/users/:id', (req, res) => {
    const {id} = req.params;
    if(!users[id]){
        return res.status(404).json({error: 'user not found'});
    }
    delete users[id];
    res.status(204).send();
});
// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing