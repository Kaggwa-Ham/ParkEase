const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const multer  = require("multer");


//Import model files
const Vehicle = require("../models/Vehicle_registration")


//Image upload configurations
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
})
let upload = multer({ storage: storage })


//Routing
router.get('/registerVehicle', (req, res) => {
    res.render('vehicleRegister');
});

router.post('/registerVehicle', upload.single('vehicleImage'), async (req, res) => {
    try {
        const uniqueTicket = "Rcpt-" + crypto.randomBytes(3).toString("hex").toUpperCase();
        const newVehicle = new Vehicle({
            driverName: req.body.driverName,
            phoneNumber: req.body.phoneNumber,
            vehicleType: req.body.vehicleType,
            numberPlate: req.body.numberPlate,
            vehicleModel: req.body.vehicleModel,
            vehicleColor: req.body.vehicleColor,
            ninNumber: req.body.ninNumber,
            arrivalTime: req.body.arrivalTime,
            receiptNumber: uniqueTicket,
            vehicleImage: req.file.path
        })
        console.log(newVehicle)
        await newVehicle.save();
        res.redirect('/')
    } catch (error) {
        console.error(error)
        res.render("vehicleRegister")
    }

});

router.get("/signout", (req, res) => {
    res.render("signout");
});

router.get("/vehiclelist", async (req, res) => {
    try {
        let vehicles = await Vehicle.find().sort({ $natural: -1 })
        res.render("vehicleList", { vehicles })
    } catch (error) {
        res.status(400).send("Unable to find vehicles in the Database.")
    }

})

module.exports = router;
