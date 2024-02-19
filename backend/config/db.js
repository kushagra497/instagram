const mongoose = require("mongoose");

const MONGODB_URI =  process.env.MONGODB_URI || "mongodb://localhost:27017/instagram";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

mongoose.connect(MONGODB_URI, options)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error.message);
    })

    module.exports = mongoose;