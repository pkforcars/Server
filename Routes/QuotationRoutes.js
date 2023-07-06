var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const express = require("express");
const Router = express.Router();
const Quote = require("../Models/Quotation");

Router.post("/AddQuote", jsonParser, async (req, res) => {
  try {
    const SaveQuote = new Quote({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      registeration: req.body.registeration,
      service: req.body.service,
      location: req.body.location,
      description: req.body.description,
    });
    const AddedQuote = await SaveQuote.save();
    return res.status(200).json({ Success: true });
  } catch (error) {
    return res.status(404).json({ error });
  }
});

Router.get("/GetQuotes", async function (req, res) {
  try {
    const Quotes = await Quote.aggregate([{ $sort: { timestamp: -1 } }]);
    return res.status(200).json(Quotes);
  } catch (error) {
    return res.status(404).json({ error });
  }
});

Router.delete("/DeleteQuote", jsonParser, async (req, res) => {
  try {
    const DeleteQuote = await Quote.findByIdAndRemove(req.body.id);
    return res.status(200).json({ Success: true });
  } catch (error) {
    return res.status(404).json({ error });
  }
});

module.exports = Router;
