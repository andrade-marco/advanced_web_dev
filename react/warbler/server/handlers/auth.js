const db = require('../models'); //imports from index file in folder
const jwt = require('jsonwebtoken');

exports.signin = async function(req, res, next) {
    try {
        //Finding a user
        //Checking if password matches what was sent to server
        //If all matches, log user in
        let user = await db.User.findOne({ email: req.body.email });
        let { id, username, profileImageUrl } = user;
        let isMatch = await user.comparePassword(req.body.password);
        if(isMatch) {
            let token = jwt.sign({ id, username, profileImageUrl }, process.env.SECRET_KEY);
            return res.status(200).json({ id, username, profileImageUrl, token });
        } else {
            return next({
                status: 400,
                message: 'Invalid email and/or password.'
            });
        }
    } catch (err) {
        return next({
            status: 400,
            message: 'Invalid email and/or password.'
        });
    }
}

exports.signup = async function(req, res, next) {
    try {
        //Create a user
        //Create a token (signing a token)
        let user = await db.User.create(req.body);
        let { id, username, profileImageUrl } = user;
        let token = jwt.sign({ id, username, profileImageUrl }, process.env.SECRET_KEY);

        return res.status(200).json({ id, username, profileImageUrl, token });

    } catch (err) {
        //See what kind of error
        //Depending on error, respond with username/email already taken
        //Otherwise, just send back a generic message

        //If validation failed - Error code for validation failed from Mongoose
        if (err.code === 11000) {
            err.message = 'Sorry, the username and/or email is already taken'
        }

        return next({
            status: 400,
            message: err.message
        })
    }
}
