const express = require("express")
const bcrypt = require("bcrypt")
const router = express.Router()
const mongoose = require("mongoose")
const User = require("../models/user.js")
const jwt = require("jsonwebtoken")
router.get("/", (req, res, next) => {

    User.find().select("email _id").then(doc => {
        console.log(doc);
        res.status(200).json({
            doc: doc
        }).catch(e => {
            console.log(e);
            res.status(500).json({
                error: e
            });
        });;
    });
});
router.post("/login", (req, res, next) => {

    User.find({
        email: req.body.email
    }).exec().then(doc => {
        if (doc.length < 1) {
            res.status(400).json({
                message: " user not found"
            });


        }
        bcrypt.compare(req.body.password, doc[0].password, (err, result) => {
            if (err) {

                return res.status(400).json({
                    message: "password not matched"
                });
            }
            if (result) {
                const token = jwt.sign({
                    email: doc[0].email,
                    id: doc[0]._id
                }, process.env.JWT_KEY, {

                    expiresIn: "1h"

                });
                return res.status(200).json({
                    iam: "Auth successful",
                    token: token
                });

            }
            res.status(401).json({
                message: "Auth Failed"
            });

        });
        // console.log(doc);
        // res.status(200).json({
        //     doc: doc
        // });
    }).catch(e => {
        console.log(e);
        res.status(500).json({
            error: e
        });
    });
});
router.post("/sinup", (req, res, next) => {
    User.find({
        email: req.body.email
    }).exec().then(doc => {

        if (doc.length >= 1) {
            res.status(200).json({
                iam: " email already exist"
            });

        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    res.status(500).json({
                        iam: " incorrect password"
                    });

                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),

                        email: req.body.email,
                        password: hash,
                    });

                    user.save().then(doc => {
                        console.log(doc);
                        res.status(200).json({
                            message: "successfully saved",
                            doc: doc.map
                        });
                    }).catch(e => {
                        console.log(e);
                        res.status(500).json({
                            error: e
                        });
                    });


                }
            });
        }
    });



});


router.delete('/:id', (req, res, next) => {
    User.remove({
            _id: req.params.id
        })
        .exec()
        .then(doc => {
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
module.exports = router;