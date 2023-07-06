const mongoose = require('mongoose');
const {Schema } = mongoose;

const AdminSchema = new Schema(
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
const Admin = mongoose.model('Admin' , AdminSchema);
module.exports = Admin;