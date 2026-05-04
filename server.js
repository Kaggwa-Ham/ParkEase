//1.Dependencies

require("dotenv").config();

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const expressSession = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo').default;


// import registration model 
const Registration = require('./models/Registration')



// import routes
const indexRoutes = require("./routes/indexRoutes");
const authRoutes = require("./routes/authRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const managerRoutes = require("./routes/managerRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");


// 2.Instantiations
const app = express();
const PORT = 3002;

// 3.Configurations
//Mongodb settings- setting up connections to the database.
mongoose.connect(process.env.DATABASE);
mongoose.connection
  .once("open", () => {
    console.log("mongoose connection open");
  })
  .on("error", (err) => {
    console.error(`Connection error:${err.message}`);
  });

//set view engine to pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views")); //specifies the views' directory

// 4.Middleware
// To parse URL encoded data
app.use(express.static(path.join(__dirname, "public"))); //this helps to serve static files like css, js, images from the public folder
app.use('/public/uploads', express.static(__dirname + '/public/uploads'))
app.use(express.urlencoded({ extended: false })); //this helps to parse data from forms
app.use(expressSession({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.DATABASE })
}));
app.use(passport.initialize());
app.use(passport.session());

/* PASSPORT LOCAL AUTHENTICATION */
passport.use(Registration.createStrategy());
passport.serializeUser(Registration.serializeUser());
passport.deserializeUser(Registration.deserializeUser());

// Global variable to make the logged in user available to all pug templates
// Passport automatically attaches the logged in user to req.user
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
})


// 5.Routes
app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/", vehicleRoutes);
app.use("/", managerRoutes);
app.use("/", dashboardRoutes);

app.use((req, res) => {
  res.status(404).send("Oops! Route not found.");
});

// app.listen(PORT, () => console.log(`listening on port ${PORT}`));

// Keep this for local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`listening on port ${PORT}`));
}

// Add this export for Vercel
module.exports = app;
