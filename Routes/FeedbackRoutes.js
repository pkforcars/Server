var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const GetUser = require("./../Middleware");
const SECRET_KEY = "secretkeyresumes";
const Orders = require("../Models/Order");
const Customers = require("../Models/Customer");
const Feedback = require("../Models/Feedback");
const express = require("express");
const Router = express.Router();

Router.post("/AddFeedback", GetUser, jsonParser, async (req, res) => {
  try {
    const FindCustomer = await Customers.findOne({ _id: req.user.id });
    const SaveFeedback = new Feedback({
      email: FindCustomer.email,
      description: req.body.description,
      stars: req.body.stars,
    });
    const AddedFeedback = await SaveFeedback.save();
    return res.status(200).json({ Success: true });
  } catch (error) {
    return res.status(404).json({ error });
  }
});

Router.get("/GetFeedback", GetUser, jsonParser, async (req, res) => {
  try {
    const FindCustomer = await Customers.findOne({ _id: req.user.id });
    const Feedbacks = await Feedback.find({ email: FindCustomer.email });

    return res.status(200).json(Feedbacks);
  } catch (error) {
    return res.status(404).json({ error });
  }
});

Router.delete("/DeleteFeedback", jsonParser, async (req, res) => {
  try {
    const FindFeedback = await Feedback.findOne({ _id: req.body.id });
    const DeletedFeedback = await Feedback.deleteOne({ _id: req.body.id });
    return res.status(200).json({ Success: true });
  } catch (error) {
    return res.status(404).json({ error });
  }
});

Router.get("/GetAllFeedback", jsonParser, async (req, res) => {
  try {
    const Feedbacks = await Feedback.find();
    return res.status(200).json(Feedbacks);
  } catch (error) {
    return res.status(404).json({ error });
  }
});

module.exports = Router;
