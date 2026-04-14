const express = require("express");
const router = express.Router();
const { isAdmin, isManager, isAttendant } = require("../middleware/auth")

// import models
const Registration = require('../models/Registration');
const Vehicle = require("../models/Vehicle_registration");
const Battery = require("../models/BatteryRegistration");


router.get("/admin", async (req, res) => {
  try {
    let users = await Registration.find().sort({ $natural: -1 })

    //Determine the selected date, default to today if none provided
    let queryDate;
    if (req.query.date) {
      queryDate = new Date(req.query.date);
    } else {
      queryDate = new Date();
    }

    //Create the start and end of the selected day for mongodb querrying
    const startOfDay = new Date(queryDate.setHours(0, 0, 0, 0))
    const endOfDay = new Date(queryDate.setHours(23, 59, 59, 999))

    //Querry signed vehicles for revenue
    // const signedOutVehicles = await 

    res.render("admin", { users });
  } catch (error) {
    res.status(400).send("Unable to find users in the Database.")
  }
})

router.get("/usersList", isAdmin, async (req, res) => {
  try {
    let users = await Registration.find().sort({ $natural: -1 })
    res.render("usersList", { users });
  } catch (error) {
    res.status(400).send("Unable to find users in the Database.")
  }
})


router.get("/signout", isAttendant, (req, res) => {
  res.render("vehicleSignout");
});

router.get("/attendant", isAttendant, async (req, res) => {
  try {
    let vehicles = await Vehicle.find({ status: "Parked" }).sort({ $natural: -1 })
    res.render("attendant", { vehicles })
  } catch (error) {
    res.status(400).send("Unable to find attendant in the Database.")
  }
});


router.post("/users/delete", async (req, res) => {
  try {
    await Registration.deleteOne({ _id: req.body.id });
    res.redirect("/usersList")
  } catch (error) {
    res.status(400).send("Unable to delete users in the Database.")
  }
})


module.exports = router;