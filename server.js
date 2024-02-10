// const express = require('express');
// const app = express();
// require('dotenv').config(); //Load environment variables from .env file
// const mongoose = require('mongoose')
// ***
// const passport = require('passport')
// const session = require('express-session')
// const MongoStore = require('connect-mongo')(session)
// const flash = require('express-flash')
// const logger = require('morgan')
// const connectDB = require('./config/database')
// const mainRoutes = require('./routes/main')
// const todoRoutes = require('./routes/todos')
// ****
// require('dotenv').config({path: './config/.env'})

// require('dotenv').config();

// ***
// Passport config
// require('.config/passport')(passport)

// connectDB()

// app.set('view engine', 'ejs')
// app.use(express.static('public'))
// app.use(express.urlencoded({ extended: true }))
// app.use(express.json())
// app.use(logger('dev'))
// Sessions
// app.use(
//     session({
//         secret: 'keyboard cat',
//         resave: false,
//         saveUninitialized: false,
//         store: new MongoStore({ mongooseConnection: mongoose.connection}),
//     })
// )
// Passport middleware
// app.use(passport.initialize())
// app.use(passport.session())

// app.use(flash())

// app.use('/', mainRoutes)
// app.use('/todos', todoRoutes)

// app.listen(process.env.PORT, ()=>{
//     console.log
// })
// ***
// app.use(express.static(__dirname));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

// app.listen(process.env.PORT, () => {
//     console.log(`Server runnin on port ${process.env.PORT}`);
// });
// ***
// module.exports = router;



// const express = require("express");
// const app = express();
// const path = require('path');
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const bcrypt = require("bcrypt");
// const passport = require("passport");
// const LocalStrategy = require('passport-local').Strategy;
// const session = require("express-session");
// const MongoStore = require("connect-mongo");
// const methodOverride = require("method-override");
// const flash = require("express-flash");
// const logger = require("morgan");
// const connectDB = require("./config/database");
// const mainRoutes = require("./routes/main");
// const postRoutes = require("./routes/posts");

// //Use .env file in config folder
// require("dotenv").config({ path: "./config/.env" });
// // Passport config
// require("./config/passport")(passport);
// //Connect To Database
// connectDB();

// const User = require('./models/User');


// mongoose.connect(process.env.DB_STRING, {
//   dbName: 'test',
// });

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// app.use(express.static(__dirname));
// app.use(bodyParser.urlencoded({ extended: true }));

// // Passport initialization
// app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// // Register route to create a new user
// app.post('/register', (req, res) => {
//   const { name, password } = req.body;

//   // Check if the username is already taken
//   User.findOne({ userName: userName }, (err, existingUser) => {
//     if (err) return res.status(500).send('Internal Server Error');

//     if (existingUser) {
//       return res.status(400).send('Username already exists');
//     }

//     // Create a new user with hashed password
//     bcrypt.hash(password, 10, (err, hashedPassword) => {
//       if (err) return res.status(500).send('Internal Server Error');

//       const newUser = new User({
//         name: name,
//         password: hashedPassword,
//       });

//       newUser.save((err) => {
//         if (err) return res.status(500).send('Internal Server Error');

//         res.redirect('/login'); // Redirect to login page after successful registration
//       });
//     });
//   });
// });

// // Your existing routes...

// app.use(express.static(__dirname));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

// app.listen(process.env.PORT, () => {
//     console.log(`Server runnin on port ${process.env.PORT}`);
// });


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const postRoutes = require("./routes/posts");
const PORT = process.env.PORT
//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/post", postRoutes);

//Server Running
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}, you better catch it!`);
});
