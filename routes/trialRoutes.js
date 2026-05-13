const express = require ("express");
const router = express.Router();
const Trial = require("../models/Trial")



router.get("/trial", async (req, res) => {
    try {
        // const trial = await Trial.find().sort({ $natural: -1 });
        res.render("trial")
    } catch (error) {
        res.send("Unable to open")
    }
})