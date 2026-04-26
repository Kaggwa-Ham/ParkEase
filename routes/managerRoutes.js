const express = require("express");
const router = express.Router();
const multer = require("multer");
const { isManager } = require("../middleware/auth")
const Battery = require("../models/BatteryRegistration");
const BatteryTransaction = require("../models/BatteryTransaction");
const Tyre = require("../models/TyreTransaction");


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


//Manager Routes
router.get("/manager", async (req, res) => {
    try {
        let batteries = await Battery.find({ status: "Available" }).sort({ natural: -1 })

        const [year, month, day] = (req.query.date || new Date().toISOString().split("T")[0]).split("-");
        const queryDate = new Date(year, month - 1, day);
        const startOfDay = new Date(new Date(queryDate).setHours(0, 0, 0, 0));
        const endOfDay = new Date(new Date(queryDate).setHours(23, 59, 59, 999));
        const batteryTransactions = await BatteryTransaction.find({
            transactionDate: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        }).populate("batteryId");

        // Calculate Battery revenue
        const batteryRevenue = batteryTransactions.reduce((total, record) => {
            return total + (record.batteryId.price || 0);
        }, 0);
        res.render("manager", { batteries, batteryRevenue })
    } catch (error) {
        console.log(error)
        res.status(400).send("Unable to find manager in the Database.")
    }
})



//Tyre Routes
router.get("/tyreServices", (req, res) => {
    res.render("tyre");
});

router.post("/tyreServices", async (req, res) => {
    console.log("reached here");
    try {
        const newTyre = new Tyre(req.body);
        console.log(newTyre);
        await newTyre.save();
        res.redirect("/tyreServices");
    } catch (error) {
        console.error(error);
        res.render("tyre");
    }
});


// Battery Routes
router.get("/registerBattery", (req, res) => {
    res.render("battery");
});

router.post("/registerBattery", upload.single('batteryImage'), async (req, res) => {
    try {
        const newBattery = new Battery(req.body);
        newBattery.batteryImage = req.file.path
        await newBattery.save();
        res.redirect("/manager");
    } catch (error) {
        console.error(error);
        res.render("battery");
    }
});


router.get("/batteryServices", async (req, res) => {
    try {
        let batteries = await Battery.find({ status: "Available" }).sort({ natural: -1 })

        const [year, month, day] = (req.query.date || new Date().toISOString().split("T")[0]).split("-");
        const queryDate = new Date(year, month - 1, day);
        const startOfDay = new Date(new Date(queryDate).setHours(0, 0, 0, 0));
        const endOfDay = new Date(new Date(queryDate).setHours(23, 59, 59, 999));
        const batteryTransactions = await BatteryTransaction.find({
            transactionDate: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        }).populate("batteryId");

        // Calculate Battery revenue
        const batteryRevenue = batteryTransactions.reduce((total, record) => {
            return total + (record.batteryId.price || 0);
        }, 0);
        res.render("batteryServices", { batteries, batteryRevenue })
    } catch (error) {
        console.log(error)
        res.status(400).send("Unable to find manager in the Database.")
    }
})

router.get("/batteryTransaction", async (req, res) => {
    try {
        const batteries = await Battery.find({ status: "Available" })
        res.render("batteryTransaction", { batteries });
    } catch (error) {
        console.error(error.message)
    }
});

router.post("/batteryServices", async (req, res) => {
    try {
        //Save new Transaction in the Battery Transaction Model
        const newBatteryTransaction = new BatteryTransaction(req.body);
        await newBatteryTransaction.save();

        //Update Battery status in the database.
        const newBatteryStatus = req.body.transactionType === "Sale" ? "Sold" : "Hired"
        await Battery.findByIdAndUpdate(req.body.batteryId, { status: newBatteryStatus })
        res.redirect("/manager");
    } catch (error) {
        console.error(error);
        res.render("batteryTransaction");
    }
});


module.exports = router;