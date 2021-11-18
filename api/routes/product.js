const express = require('express')
const mongoose = require('mongoose')
const Product = require('../models/product.js')
const app = express()
const router = express.Router()
// const router = express.Router()

router.get('/', (req, res, next) => {

    res.status(200).json({
        iam: "get request"
    });


});
router.post('/', (req, res, next) => {

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
    });
    product.save();

    // const 
    console.log(product);

    // console.log(product);

    res.status(200).json({
        iam: "post request",
        product: product
    });


});
router.get('/:id', (req, res, next) => {


    // res.status(200).json({
    //     iam: "get request with  $id !"
    // });
    const id = req.params.id;
    Product.findById(id).exec().then(result => {
        console.log(result);
        res.status(200).json({
            message: "Handling post request",
            result: result
        });
    }).catch(e => {
        console.log(e);
        res.status(500).json({
            error: e
        });
    });


});
router.patch('/:id', (req, res, next) => {

    res.status(200).json({
        iam: "PATCH request with  $id !"
    });


});

router.delete('/:id', (req, res, next) => {

    res.status(200).json({
        iam: "delete request with  $id !"
    });

});

module.exports = router;