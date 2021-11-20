const express = require('express')
const mongoose = require('mongoose')
const Product = require('../models/product.js')
const app = express()
const multer = require('multer')
const checkAuth = require("../middleware/check-auth");
const router = express.Router()
// const router = express.Router()
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    // if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    //     cb(null, true);
    // } else {
    //     cb(null, false);

    // }
    cb(null, true);
};
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter
});

router.get('/', (req, res, next) => {

    // console.log("-0------------");

    Product.find().select('name price _id count productimage').exec().then(doc => {
        if (doc.length > 0) {
            const response = {
                count: doc.count,
                products: doc.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        request: {
                            type: "GET",
                            url: "http://localhost/3000/products/" + doc.id
                        }
                    }
                })
            }
            res.status(200).json(
                response
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
router.post('/', checkAuth, upload.single("productImage"), (req, res, next) => {
    // router.post('/', checkAuth, (req, res, next) => {

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        prodimage: req.file.path
    });
    product.save().then(doc => res.status(200).json({
        iam: "post request",
        product: doc
    })).catch(e => {
        console.log(e);
        res.status(500).json({
            error: e
        });
    });;





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


















