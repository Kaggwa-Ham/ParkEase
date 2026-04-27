const express = require("express");
const router = express.Router();
const { isAdmin, isManager, isAttendant } = require("../middleware/auth")

// import models
const Registration = require('../models/Registration');
const Vehicle = require("../models/Vehicle_registration");
const Battery = require("../models/BatteryRegistration");
const Signout = require("../models/Signout");
const BatteryTransaction = require("../models/BatteryTransaction");
const TyreTransaction = require("../models/TyreRegistration");


router.get("/admin", async (req, res) => {
  try {
    let users = await Registration.find().sort({ $natural: -1 })

    //Determine the selected date, default to today if none provided
    // let queryDate;
    const [year, month, day] = (req.query.date || new Date().toISOString().split("T")[0]).split("-");
    const queryDate = new Date(year, month - 1, day);
    const selectedDate = `${year}-${month}-${day}`;

    const startOfDay = new Date(new Date(queryDate).setHours(0, 0, 0, 0));
    const endOfDay = new Date(new Date(queryDate).setHours(23, 59, 59, 999));

    // 1. query signed out vehicles for parking revenue
    const signedOutVehicles = await Signout.find({
      signoutTime: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    })
      .populate("vehicleId")
      .sort({ signoutTime: -1 });

    // Calculate parking revenue
    const parkingRevenue = signedOutVehicles.reduce((total, record) => {
      return total + (record.amountPaid || 0);
    }, 0);

    // 2. Query Tyre transactions
    const tyreTransaction = await TyreTransaction.find({
      transactionDate: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    // Calculate Tyre revenue
    const tyreRevenue = tyreTransaction.reduce((total, record) => {
      return total + (record.price || 0);
    }, 0);

    // 3. Query Battery transactions
    const batteryTransactions = await BatteryTransaction.find({
      transactionDate: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    // Calculate Battery revenue
    const batteryRevenue = batteryTransactions.reduce((total, record) => {
      return total + (record.price || 0);
    }, 0);

    //Calculate Grand Total
    const grandTotal = parkingRevenue + tyreRevenue + batteryRevenue;
    
    res.render("admin", {
      selectedDate,
      signedOutVehicles,
      parkingRevenue,
      batteryRevenue,
      tyreRevenue,
      users,
      grandTotal
    });

  } catch (error) {
    res.status(400).send("Unable to find users in the Database.")
  }
})

router.get("/usersList", async (req, res) => {
  try {
    let users = await Registration.find().sort({ $natural: -1 })
    res.render("usersList", { users });
  } catch (error) {
    res.status(400).send("Unable to find users in the Database.")
  }
})

router.get("/attendant", async (req, res) => {
  try {
    let vehicles = await Vehicle.find({ status: "Parked" }).sort({ $natural: -1 })

   const [year, month, day] = (req.query.date || new Date().toISOString().split("T")[0]).split("-");
    const queryDate = new Date(year, month - 1, day);
    const selectedDate = `${year}-${month}-${day}`;

    const startOfDay = new Date(new Date(queryDate).setHours(0, 0, 0, 0));
    const endOfDay = new Date(new Date(queryDate).setHours(23, 59, 59, 999));

    // 1. query signed out vehicles for parking revenue
    const signedOutVehicles = await Signout.find({
      signoutTime: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    })
      .populate("vehicleId")
      .sort({ signoutTime: -1 });

    // Calculate parking revenue
    const parkingRevenue = signedOutVehicles.reduce((total, record) => {
      return total + (record.amountPaid || 0);
    }, 0);

    res.render("attendant", {
      vehicles,
      selectedDate,
      parkingRevenue
    })
  } catch (error) {
    res.status(400).send("Unable to find attendant in the Database.")
  }
});

//Update user routes
//Show the update form
router.get("/users/update/:id", async (req, res) => {
  try {
    const user = await Registration.findById(req.params.id)
    if (!user) return res.redirect("/usersList")
    res.render("updateUser", { user })
  } catch (error) {
    res.status(400).send("Unable to find user in the Database.")
  }
})

router.post("/users/update/:id", async (req, res) => {
  try {
    await Registration.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/usersList")
  } catch (error) {
    res.status(400).send("Unable to update user in the Database.")
  }
})


router.post("/users/delete", async (req, res) => {
  try {
    await Registration.deleteOne({ _id: req.body.id });
    res.redirect("/usersList")
  } catch (error) {
    res.status(400).send("Unable to delete users in the Database.")
  }
})


module.exports = router;