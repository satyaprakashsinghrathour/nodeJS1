const morgan = require("morgan")
const express = require('express')
const app = express()
// const bodyparser=require("body-parser")
//  const router = require("./app")
const productRouter = require("./api/routes/product")
const orderRouter = require("./api/routes/order")
const port = process.env.PORT || 3000


app.use(morgan("dev"));
// app.use(bodyparser.urlencoded({ extended: true }));

app.use('/product', productRouter);
app.use('/order', orderRouter);
app.use((req, res, next) => {
    const error = new Error();
    error.status=404;
    next(error);
});
app.use((error,req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });


});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))



///////