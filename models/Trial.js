const mongoose = require("mongoose");

const trialSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
});



module.exports = mongoose.model("Trial", trialSchema);