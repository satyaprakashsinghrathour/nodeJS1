const express = require('express')
const app = express()
const router = express.Router()

router.get('/', (req, res, next) => {

    res.status(200).json({
        iam: "get request"
    });


});
router.post('/', (req, res, next) => {
    const product = {
        id: req.body.id,
        name: req.body.name
    }
    res.status(200).json({
        iam: "post request",
        product: product
    });


});
router.get('/:id', (req, res, next) => {

    res.status(200).json({
        iam: "get request with  $id !"
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