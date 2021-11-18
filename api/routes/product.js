const express = require('express')
const mongoose = require('mongoose')
const Product = require('../models/product.js')
const app = express()
const router = express.Router()
// const router = express.Router()

router.get('/', (req, res, next) => {



    Product.find().exec().then(doc => {
        if (doc.length > 0) {
            res.status(200).json(
                doc
            )
        } else {
            res.status(200).json({
                message: "No entries found"
            })
        }

    }).catch(e => res.status(200).json({
        error: e,
    }));


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


    const id = req.params.id;
    Product.findById(id).exec().then(result => {
        console.log(result);
        if (result) {
            res.status(200).json({
                message: "Handling post request",
                result: result
            });
        } else {
            res.status(200).json({
                message: "invalid id",
                // result: result
            });

        }
    }).catch(e => {
        console.log(e);
        res.status(500).json({
            error: e
        });
    });


});
router.patch('/:id', (req, res, next) => {

    const id = req.params.id;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.updateMany({
        _id: id
    }, {
        $set: updateOps
    }).exec().then(doc => res.status(200).json(doc)).catch(e => {
        console.log(e);
        res.status(500).json({
            error: e
        });
    });;


});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;


    Product.remove({
        _id: id
    }).then(doc => console.log(doc)).catch(e => res.status(400).json({
        error: e
    }));



});

module.exports = router;