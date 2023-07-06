const mongoose = require('mongoose');
const {Schema } = mongoose;

const QuotationSchema = new Schema(
    {
        email:
        {
            type: String,
        },
        name:
        {
            type: String,
        },
        phone:
        {
            type: String,
        },
        registeration:
        {
            type: String,
        },
        service:
        {
            type: String,
        },
        location:
        {
            type: String,
        },
        description: 
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
const Quotation = mongoose.model('Quotation' , QuotationSchema);
module.exports = Quotation;