const mongoose = require('mongoose');
const {Schema } = mongoose;

const FeedbackSchema = new Schema(
    {
        email:
        {
            type: String,
        },
        description: 
        {
            type: String,
        },
        stars:
        {
            type: Number
        },
        timestamp: 
        {
            type: Date,
            default: Date.now,
        },
    }
);
const Feedback = mongoose.model('Feedback' , FeedbackSchema);
module.exports = Feedback;