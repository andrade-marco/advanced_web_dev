//Message model
const mongoose = require('mongoose');
const User = require('./user');

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxLength: 160
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
{
    timestamps: true //Adds createdAt and updatedAt for each message
});

//Hook
//Removing message - when a message is removed, we need to find the message in the user by its ID and remove it.
//If we don't do that, we will leave an ID for a message that no longer exists in the message's array of the user.
messageSchema.pre('remove', async function(next) {
    try {
        //Find a user
        //Remove the id of the message from their messages list
        //Save that user
        //Return next
        let user = await User.findById(this.user);
        user.messages.remove(this.id);
        await user.save();
        return next();

    } catch (err) {
        return next(err);
    }
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
