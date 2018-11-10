//User model
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Defining user schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true, //Make it required
        unique: true //Make it unique
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }]
});

//Hooks
//Hashing password before saving - this code encrypts the password before saving the instance of user into the database.
//This is required so we do not store actual passwords into the database.
userSchema.pre('save', async function(next) {
    try {
        //If password is not new (instance of user is not being modified) then move along
        //It continues to save the instance, without re-hashing the password
        if (!this.isModified('password')) return next();

        //Password hashing
        //The number in the hash method is the salt (extra pieces of information for security)
        //It adds extra characters to the encryption to ensure that equal passwords are not hashed in the same way
        let hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;

        return next();

    } catch (err) {
        return next(err);
    }
});

//Adding a method to user schema - this adds a method to the user schema to allow for checking the password
//Every document of the user model will be able to compare password for authentication
//Keyword 'this' refers to the document invoking the method
userSchema.methods.comparePassword = async function(candidatePassword, next) {
    try {
        let isMatch = bcrypt.compare(candidatePassword, this.password); //Check password
        return isMatch;
    } catch (err) {
        return next(err);
    }
}

//Create model
const User = mongoose.model('User', userSchema);
module.exports = User;
