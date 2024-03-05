const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

const userMessageSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    messages: {
        type: [messageSchema],  // Use the messageSchema as a sub-schema here
        required: true
    }
});

const UserMessage = mongoose.model('UserMessage', userMessageSchema);

module.exports = UserMessage;
