const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
        productimage: String
    // password: {
    //     type: String,
    //     required: true
    // } 
});
module.exports = mongoose.model("Product", productSchema);