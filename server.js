const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const requireDir = require("require-dir");
const db = require("./config/db");

// Initializing the App
const app = express();

// Permits to send data to the app in JSON format
app.use(express.json());

// Permits CORS to all domains (because it has no parameters)
app.use(cors());

// Initializing the docway-api DB
mongoose.connect(db.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
  console.log("Application connected on database =D");
});

mongoose.connection.on("disconnected", () => {
  console.log("Application disconnected from database!");
});

mongoose.connection.on("error", err => {
  console.log(`Error connecting to database: ${err}`);
});

requireDir("./src/models");

// Routes
// This "use" method is like a wildcard. It will receive every kind of request (GET, POST, etc.).
// Every time we receive a request, we will forward it to our file "./src/routes".
app.use("/api", require("./src/routes/routes"));

const port = process.env.PORT || 8089;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
