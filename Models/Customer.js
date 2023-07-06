const mongoose = require('mongoose');
const {Schema } = mongoose;

const CustomerSchema = new Schema(
    {
        firstName: 
        {
            type: String,
        },
        lastName:
        {
            type: String,
        },
        email:
        {
            type: String,
            required: true,
        },
        password: 
        {
            type: String,
        },
        phone:
        {
            type: String,
        },
        timestamp: 
        {
            type: Date,
            default: Date.now,
        },
    }
);
const Customer = mongoose.model('Customer' , CustomerSchema);
module.exports = Customer;