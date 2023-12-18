const mongoose = require("mongoose");

const conn = async (req, res) => {
  try {
    await mongoose.connect(
      "mongodb+srv://satenderyadavviii:" +
        encodeURIComponent("HOLIpack@2015") +
        "@cluster0.7iwkfba.mongodb.net/"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Connection error:", error.message);
    res.status(400).json({
      message: "Not Connected",
    });
  }
};

module.exports = conn;
