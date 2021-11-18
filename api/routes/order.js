const express = require('express')
const mongoose = require('mongoose')
const Order = require('../models/order.js');
const Product = require('../models/product.js');
// const app = require('../../app')

const router = express.Router()
router.get('/', (req, res, next) => {

    Order.find().populate("product", "name _id ").select("_id product quantity").exec().then(doc => {
        console.log(doc);
        res.status(200).json({
            doc: doc
        });
    }).catch(e => {
        console.log(e);
        res.status(500).json({
            error: e
        });
    });
});
router.get('/:id', (req, res, next) => {

    res.status(200).json({
        iam: "order get request id-----------"
    });
});
router.post("/", (req, res, next) => {

    // Product.findById(req.body.id).then(doc => {

    //     if (!doc) {
    //         res.status(400).json({
    //             error: "Product not found"
    //         });
    //     }


    // });
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.id,
    });
    order.save().then(doc => {
        console.log(doc);
        res.status(200).json({
            doc: doc
        });
    }).catch(e => {
        console.log(e);
        res.status(500).json({
            error: e,
            message: "error"
        });
    });
});
router.delete('/:id', (req, res, next) => {


    res.status(200).json({
        iam: "order delete request id-----------"
    });
});
module.exports = router