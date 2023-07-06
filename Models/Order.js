const mongoose = require('mongoose');
const {Schema } = mongoose;

const OrderSchema = new Schema(
    {
        UserEmail : String,
        Email: String,
        Address1: String,
        Address2: String,
        City : String,
        PostCode : String,
        Country : String,
        Phone: String,        
        Type: String,
        FrontOption : String,
        RearOption : String,
        PlateChoice : String,
        PlateText : String,
        Font : String,
        FrontSize : String,
        RearSize : String,
        Badge: String,
        BadgeBackground : String,
        FittingKit : String,     
        Material : String,       
        Border : String,
        Vertical : Boolean,
        ShortHand : Boolean,
        Delivery : String,
        Spare : Boolean,
        OrderValue : Number,
        OrderStatus:
        {
            type: String,
            default: 'Not Processed',
            enum : [ 'Not Processed' , 'Processing' , 'Disputed' , "Delivered" , "Cancelled" ]
        }, 
        timestamp: 
        {
            type: Date,
            default: Date.now,
        },
    }
);
const Order = mongoose.model('Orders' , OrderSchema);
module.exports = Order;