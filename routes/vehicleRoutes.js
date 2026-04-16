const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const multer = require("multer");
const { isAttendant } = require("../middleware/auth");
const calculateParkingFee = require("../utils/feeCalculator");


//Import model files
const Vehicle = require("../models/Vehicle_registration");
const Signout = require("../models/Signout")



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
    res.render('register-vehicle');
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
        res.redirect('/attendant')
    } catch (error) {
        console.error(error)
        res.render("register-vehicle")
    }

});

// router.get("/signout", (req, res) => {
//     res.render("signoutConfirm")
// })

// router.post("/signout/verify", async (req, res) => {
//     try {
//         const vehicle = await Vehicle.findOne({ receiptNumber: req.body.receiptNumber, status: "Parked" })
//         if (!vehicle) {
//             return res.render("signout")
//         }
//         const fee = calculateParkingFee(vehicle.vehicleType, vehicle.arrivalTime)
//         res.render("signoutConfirm", { vehicle, fee })
//     } catch (error) {
//         res.render("signout")
//     }
// });

router.get("/signout/confirm", (req, res) => {
    res.render("signoutConfirm")
})


router.post("/signout/confirm", async (req, res) => {
    try {
        const receiptNumber = req.body.receiptNumber;
        const vehicle = await Vehicle.findOne({ receiptNumber });
        if (!vehicle) {
            return res.status(404).send("Vehicle not found with that receipt number");
        }
        // if (vehicle.status === "Signed Out") {
        //     return res.send("Vehicle is already signed out");
        // }
        console.log(vehicle.arrivalTime);
        console.log("Receipt:", receiptNumber);
        console.log("Vehicle:", vehicle);
        
        console.log("Body:", req.body);
        const fee = calculateParkingFee(vehicle.vehicleType, vehicle.arrivalTime);
        console.log("Fee:", fee);
        const newSignout = new Signout({
            receiptNumber: vehicle.receiptNumber,
            vehicleId: vehicle._id,
            amountPaid: fee,
            receiverName: req.body.receiverName,
            phoneNumber: req.body.phoneNumber,
            gender: req.body.gender,
            ninNumber: req.body.ninNumber
        });
        const savedSignout = await newSignout.save();
        vehicle.status = "Signed-out";
        await vehicle.save();
        res.redirect(`/signout/receipt/${savedSignout._id}`);
    } catch (error) {
        console.log("ERROR:", error);
        res.status(400).send("Failed to sign out vehicle.");
    }
});


router.get("/signout/receipt/:id", async (req, res) => {
    try {
        const record = await Signout.findById(req.params.id).populate("vehicleId")
        if (!record) {
            return res.redirect("/signout")
        }
        console.log(record)
        res.render("receipt", { record })

    } catch (error) {
        res.render("signout")
    }
});



module.exports = router;
