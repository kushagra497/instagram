const mongoose  = require("mongoose");

const pictureSchema = new mongoose.Schema({
    quote :{type: String, required: true},
    image : {type: String, required: true},
    device : {type: String, required: true},
    CommentCount : {type: Number, default: 0},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"}

})

module.exports = mongoose.model("Picture", pictureSchema);