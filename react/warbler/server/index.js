//WARBLER APP
//Initializers
//External imports
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

//Internal imports
const db = require('./models');
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');
const messagesRoutes = require('./routes/messages');
const { loginRequired, ensureCorrectUser } = require('./middleware/auth');

//Global vars
const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/users/:id/messages',
    loginRequired,
    ensureCorrectUser,
    messagesRoutes); //Add middlewares for authentication and authorization

//Get all messages
app.get('/api/messages', loginRequired, async function(req, res, next) {
    try {
        let messages = await db.Message.find()
            .sort({ createdAt: 'desc'})
            .populate('user', { username: true, profileImageUrl: true });

        return res.status(200).json(messages);

    } catch(err) {
        return next(err);
    }
});

//Error handling
//For production, do not use throw or console.log - we create a new error and pass it to the next middleware
//This will be reached if none of the app's routes was reached
app.use(function(req, res, next) {
    let err = new Error('Not found');
    err.status = 404;
    next(err);
});

//This will take any incoming error from middleware and display a nicer message;
app.use(errorHandler);


//Listening on PORT=8081
app.listen(PORT, function() {
    console.log(`Server started on port: ${PORT}`);
});
