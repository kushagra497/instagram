const mongoose = require("mongoose");

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})
const BlacklistedToken = mongoose.model("BlacklistedToken", blacklistTokenSchema);

module.exports = BlacklistedToken;