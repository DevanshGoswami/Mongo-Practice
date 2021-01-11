var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var friendSchema = new mongoose.Schema({
    email: String, 
    password: String,
    name: String,
    age: Number,
    description: String
});

friendSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Friend",friendSchema);
