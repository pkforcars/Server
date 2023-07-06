var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const GetUser = require("./../Middleware");
const SECRET_KEY = "secretkeyresumes";
const Orders = require("../Models/Order");
const Customers = require("../Models/Customer");
const express = require("express");
const Router = express.Router();

Router.get("/GetCustomerOrders", GetUser, jsonParser, async (req, res) => {
  try {
    const FindCustomer = await Customers.findOne({ _id: req.user.id });
    const CustomerOrders = await Orders.find({ UserEmail: FindCustomer.email });
    return res.status(200).json(CustomerOrders);
  } catch (error) {
    return res.status(404).json({ error });
  }
});

Router.get("/GetNewOrders", jsonParser, async (req, res) => {
    try {
      const NEWORDERS = await Orders.aggregate([
        {
          $match: {
            $or: [
              { OrderStatus: "Not Processed" },
              { OrderStatus: "" }
            ]
          }
        },
        {
          $sort: { timestamp: -1 }
        }
      ]);
  
      return res.status(200).json(NEWORDERS);
    } catch (error) {
      return res.status(404).json({ error });
    }
  });
  
Router.get("/GetProcessedOrders", jsonParser, async (req, res) => {
    try {
      const NEWORDERS = await Orders.aggregate([
        {
          $match: { OrderStatus: "Processing" },
        },
        {
          $sort: { timestamp: -1 },
        },
      ]);
  
      return res.status(200).json(NEWORDERS);
    } catch (error) {
      return res.status(404).json({ error });
    }
  });

  Router.get("/GetDeliveredOrders", jsonParser, async (req, res) => {
    try {
      const NEWORDERS = await Orders.aggregate([
        {
          $match: { OrderStatus: "Delivered" },
        },
        {
          $sort: { timestamp: -1 },
        },
      ]);
  
      return res.status(200).json(NEWORDERS);
    } catch (error) {
      return res.status(404).json({ error });
    }
  });
  Router.get("/GetDisputedOrders", jsonParser, async (req, res) => {
    try {
      const NEWORDERS = await Orders.aggregate([
        {
          $match: { OrderStatus: "Disputed" },
        },
        {
          $sort: { timestamp: -1 },
        },
      ]);
  
      return res.status(200).json(NEWORDERS);
    } catch (error) {
      return res.status(404).json({ error });
    }
  });
  
  Router.get("/GetCancelledOrders", jsonParser, async (req, res) => {
    try {
      const NEWORDERS = await Orders.aggregate([
        {
          $match: { OrderStatus: "Cancelled" },
        },
        {
          $sort: { timestamp: -1 },
        },
      ]);
  
      return res.status(200).json(NEWORDERS);
    } catch (error) {
      return res.status(404).json({ error });
    }
  });

Router.post("/Status", jsonParser, async (req, res) => {
  try {

    if (req.body.OrderStatus === '')
    {
        return res.status(200).json({ Success: true });
    }

        const Response = await Orders.findByIdAndUpdate(
        req.body.id,
        { OrderStatus: req.body.OrderStatus },
        { new: true }
      );
      return res.status(200).json({ Success: true, Response });
  } catch (error) {
    return res.status(404).json({ error });
  }
});

module.exports = Router;
