require("dotenv").config();
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Init Middleware
app.use(express.json({ extended: false, limit: "50mb", parameterLimit: 50000 }));

const corsOptions = {
  credentials: true,
  origin: process.env.REACT_APP_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Add headers
app.use(cors(corsOptions));
app.options("*", cors());

app.get("/", (req, res) => res.send("API running"));

// Define Routes
app.use("/api/ytdl", require("./routes/youtube"));

const LISTEN_PORT = process.env.PORT || 5002;

app.listen(LISTEN_PORT, () => console.log(`Server started on port ${LISTEN_PORT}`));
module.exports = app;
