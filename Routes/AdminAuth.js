const express = require('express');
const Router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const GetUser = require('./../Middleware')
const SECRET_KEY = "BancroftAutoLocksmithsXXXX";
const Admin = require('../Models/Admin')


Router.post('/Login', jsonParser, async (Req, Res) => {
  try {
      let UserFound = await Admin.findOne({ email: Req.body.email});
      if (!UserFound) {
          return Res.status(400).json({ Success: false, Error: "Enter Correct Email/Password" });
      }
      const ComparePassword = await bcrypt.compare(Req.body.password , UserFound.password);
      if (!ComparePassword)
      {
          return Res.status(400).json({ Success: false , Error: "Enter Correct Email/Password"});     
      }

      const Data = { user: { id: UserFound.id } };
      const AuthToken = jwt.sign(Data, SECRET_KEY);

      UserFound = await Admin.findOne({ email: Req.body.email}).select("-password")

      Res.json({ Success: true, AuthToken: AuthToken , UserFound });
  } catch (error) {
      return Res.status(400).json({ Error: "An Error Occured" });
  }
});

Router.post('/CreateAccount', jsonParser, async (Req, Res) => {
    try 
    {
        const AlreadyExsists = await Admin.find({email:Req.body.email})
        if(AlreadyExsists.length > 0)
        {
            return Res.status(400).json({ Success: false , Error: "Email Already Exsists"});
        }

        const Salt = await bcrypt.genSalt(10);
        Req.body.password = await bcrypt.hash(Req.body.password, Salt);
        const SaveAdmin = new Admin({
          firstName : Req.body.firstName,
          lastName : Req.body.lastName,
          email: Req.body.email,
          password: Req.body.password,
          phone : Req.body.phone
        })
        const AddedAdmin = await SaveAdmin.save();
        Res.status(200).send({ Success: true  });
    } catch (error) {
        Res.status(404).json({ Error: error });
    }
});

module.exports = Router;
