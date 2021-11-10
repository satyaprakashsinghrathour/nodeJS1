const express = require('express')
const app = express()

app.use((req, res, next) => {

    req.statusCode(200).json({
        "message": "hello world",
    });
});


module.exports=app