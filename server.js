require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const userRouter = require("./routers/user-router");
const accountRouter = require("./routers/account-router");
const policyRouter = require("./routers/policy-router");
const csvRouter = require("./routers/csv-uploder-router");

// Set the "public" directory path
app.set("public", `${__dirname}/public`);

// Enable strict mode for querying in Mongoose
mongoose.set("strictQuery", true);

// Connect to the database
mongoose.connect(process.env.DATABASE_URL).then(() => {
  console.log("Connected to the database successfully");
});

// Limit JSON payload size to 1100kb
app.use(bodyParser.json({ limit: "1100kb" }));

// Configure CORS settings
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

// Parse JSON and URL-encoded payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Logging middleware
app.use(logger("dev"));

// Serve static files from the "public" directory
app.use(express.static(__dirname + "/public"));

// Parse cookies
app.use(cookieParser());

// Mount the user router at the "/api" route
app.use("/api", csvRouter);
app.use("/api/user", userRouter);
app.use("/api/account", accountRouter);
app.use("/api/policy", policyRouter);

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;
