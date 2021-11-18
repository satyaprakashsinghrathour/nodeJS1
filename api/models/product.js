const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
    // password: {
    //     type: String,
    //     required: true
    // } 
});
module.exports = mongoose.model("Product", userSchema);
