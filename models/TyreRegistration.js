const mongoose = require('mongoose');
const batteryRegistration = new mongoose.Schema({
    model: {
        type: String,
        // enum: ["Michelin", "Bridgestone", "BFGoodrich"]
    },
    size: {
        type: String,
        // enum: ["15_inch", "17_inch", "18_inch"]
    },
    service: {
        type: String,
        // enum: ["pressureFilling", "punctureFixing", "valveReplacement"]
    },
    price: {
        type: Number
    },
    name: {
        type: String
    },
    phoneNumber: {
        type: Number
    },
    numberPlate: {
        type: String
    },
    transactionDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Tyre", batteryRegistration);