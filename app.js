



// ℹ️ Gets access to environment variables/settings

// https://www.npmjs.com/package/dotenv
require("dotenv").config();

const { isAuthenticated } = require("./middleware/jwt.middleware")

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");


const app = express();
let cors = require("cors");
app.use(cors());
// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");

// app.use("/api", indexRoutes);
app.use("/", indexRoutes);

const gameRoutes = require("./routes/game.routes")
app.use("/games", gameRoutes)
//❗❗❗❗❗❗  we used {mergeParams} in review.routes file ,edit if it does not work
app.use("/games/:id/review", require("./routes/review.routes"))

const userRoutes = require("./routes/user.routes")
app.use("/profile", userRoutes)

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
