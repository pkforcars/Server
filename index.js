const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const FetchUser = require('./Middleware')


const DBstring = process.env.MONGO_URL;

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://platekeys4cars.vercel.app',
    'https://pk4cars.vercel.app',
    'https://platenkeys4cars.co.uk',
    'https://platenkeys4cars.co.uk/',
    'https://www.platenkeys4cars.co.uk',
],
  optionsSuccessStatus: 200
}));

mongoose.set('strictQuery',true)

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to Database`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

//Connect to the database before listening

app.use('/customer', require('./Routes/UserAuth'))
app.use('/admin', require('./Routes/AdminAuth'))
app.use('/orders', require('./Routes/OrdersRoutes'))
app.use('/feedback' , require('./Routes/FeedbackRoutes'))
app.use('/quote', require('./Routes/QuotationRoutes'))
const Order = require('./Models/Order');
const Customer = require('./Models/Customer');

   app.post('/Payment' , jsonParser , async (req,res)=>{
    try {
        const { token , amount } = req.body;
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })
        const charge = await stripe.charges.create({
            amount: amount * 100,
            currency: 'GBP',
            customer: customer.id,
            receipt_email: token.email,
            description: "A test account"
        })
    }
    catch (error) {
        console.log(error);
        Status = "failed";
        Error = error;
    }
})

app.get("/config" , (req,res) =>{
    res.send({
        publishableKey : process.env.PUBLISHABLE_KEY
    })
})
app.post("/create-payment-intent", jsonParser, async (req, res) => {
    try {
      const amountInCents = Math.round(parseFloat(req.body.Price) * 100);
  
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: 'eur',
        automatic_payment_methods: { enabled: true }
      });
  
      if (!paymentIntent) {
        return res.status(500).json({ error: "Payment Intent Error" });
      }
      res.status(200).json({ ClientSecret: paymentIntent.client_secret });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server Error" });
    }
  });
  
app.post("/createOrder"  , jsonParser , async( req, res ) =>{
    try
    {
        const NewOrder = new Order({
            UserEmail : req.body.Email,
            Email: req.body.Email,
            Address1: req.body.Address1,
            Address2: req.body.Address2,
            City : req.body.City,
            PostCode : req.body.PostCode,
            Country : req.body.Country,
            Phone: req.body.Phone,
            Type: req.body.Type,
            FrontOption : req.body.FrontOption,
            RearOption : req.body.RearOption,
            PlateChoice : req.body.PlateChoice,
            PlateText : req.body.PlateText,
            Layout : req.body.Layout,
            Font : req.body.Font,
            FrontSize : req.body.FrontSize,
            RearSize : req.body.RearSize,
            Badge: req.body.Badge,
            BadgeBackground : req.body.BadgeBackground,
            Border : req.body.Border,
            Vertical : req.body.Vertical,
            ShortHand : req.body.ShortHand,
            Delivery : req.body.Delivery,
            FittingKit :  req.body.FittingKit ,     
            Material :  req.body.Material,      
            Spare : req.body.Spare,
            OrderValue : req.body.OrderValue,
            OrderStatus: "Not Processed",
            FrontText: req.body.FrontText,
            RearText: req.body.RearText,
            OtherItems: req.body.OtherItems,
            Font: req.body.Font,
            LeftBadge: req.body.LeftBadge,
            LeftBadgeBackground: req.body.LeftBadgeBackground,
            RightBadge: req.body.RightBadge,
            RightBadgeBackground: req.body.RightBadgeBackground,
            FooterText: req.body.FooterText,
            FooterColor: req.body.FooterColor,
            PlateType: req.body.PlateType,
            BadgeCity: req.body.BadgeCity,
            BadgeFlag: req.body.BadgeFlag,
            timestamp: Date.now(),
        }).save()
        console.log(
          NewOrder
        )
        res.status(200).json({success: true})


    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({ error: "Server Error" });
    }
})

const stripe = require('stripe')(process.env.STRIPE_KEY)

app.post('/PaymentIntent', jsonParser , async (req,res)=>
{
  try
  {
     const {Price} = req.body;
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Price * 100,
        currency: 'gbp',
      });
      console.log(paymentIntent.client_secret)
      res.status(200).json({ClientSecret:paymentIntent.client_secret,SK:process.env.STRIPE_KEY})
  }
  catch(err)
  {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
})


PORT = process.env.PORT || 5001
connectDB().then(() => {
  app.listen(PORT, () => {
      console.log(`Server is live at PORT: ${PORT}`);
  })
})

module.exports = app;
