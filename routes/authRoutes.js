const express = require("express");
const router = express.Router();
const passport = require("passport")
const { isAdmin } = require("../middleware/auth");

//import database file/ import registration model
const Registration = require("../models/Registration");

router.get("/signup", (req, res) => {
  res.render("registerUsers");
});

router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const newUser = new Registration(req.body);
    await Registration.register(newUser, req.body.password);
    res.redirect("/admin");
  } catch (error) {
    console.error(error)
    res.send("Not able to send user to the database")
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", passport.authenticate("local", {
    failureRedirect: "/auth/login"
}), (req, res) => {
    const redirectMap = {
        "Admin": "/admin",
        "Manager": "/manager",
        "Attendant": "/attendant"
    }

    const destination = redirectMap[req.user.role] || "/";
    res.redirect(destination);
});

router.get("/logout", (req, res, next) => {
  req.logout(function(err) {
    if(err) { 
      return next(err); 
    }
    res.redirect("/auth/login")
  })
})

module.exports = router;
