const express = require('express')
// const app = require('../../app')
const router = express.Router()
router.get('/', (req, res, next) => {


    res.status(200).json({
        iam: "order get request"
    });
});
router.get('/:id', (req, res, next) => {                                                  
                                                  
    res.status(200).json({                                                  
        iam: "order get request id-----------"                                                  
    });                                                  
});                                                  
router.delete('/:id', (req, res, next) => {                                                  
                                                  
                                                  
    res.status(200).json({                                                  
        iam: "order delete request id-----------"                                                  
    });                                                                                         
});                                                                                         





module.exports = router