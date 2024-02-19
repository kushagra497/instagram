const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./backend/model/user");
const pictureRoutes = require("./backend/model/picture");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/user", userRoutes);
app.use("/picture", pictureRoutes);

// MongoDB connection
(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
})();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
