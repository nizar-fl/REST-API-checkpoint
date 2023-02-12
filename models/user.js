const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    PhoneNumber:{
        Type:Number,
        required:false,
    },
    SelfImage:{
        type:String,
        required:false,
        default: "https://assets.stickpng.com/images/585e4bcdcb11b227491c3396.png"
    }


})
module.exports = mongoose.model("User", userSchema);