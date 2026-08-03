const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static Files
app.use(express.static("public"));

// Home Route
app.get("/", (req, res) => {
    res.send("Manual Stock Take by HHD Server Running...");
});

// Health Check
app.get("/api/status", (req, res) => {
    res.json({
        success: true,
        message: "Server Running Successfully"
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});