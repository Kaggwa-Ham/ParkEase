const express = require("express");
const router = express.Router();

// import routes 
const Registration = require('../models/Registration')

router.get("/manager", (req, res) => {
  res.render("manager");
});

router.get("/admin", (req, res) => {
  res.render("admin");
});

router.get("/usersList", async (req, res) => {
  try {
    let users = await Registration.find().sort({$natural: -1})
    res.render("usersList", {users});
  } catch (error) {
    res.status(400).send("Unable to find users in the Database.")
  }
  
})

module.exports = router;