const morgan = require("morgan")
const express = require('express')
const mongoose = require("mongoose")
const app = express()
// const bodyparser = require("body-parser")
//  const router = require("./app")
const productRouter = require("./api/routes/product")
const orderRouter = require("./api/routes/order")
const port = process.env.PORT || 3000
app.use(morgan("dev"));
app.use(express.urlencoded({
    extended: true
}));



// const uri = "mongodb+srv://admin:" + process.env.Password + "@cluster0.czbnu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const uri = "mongodb+srv://admin:eIJtuUklr12MjN1t@cluster0.czbnu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, {
    // useMongoClint: true,
    useNewUrlParser: true,
    // useUnifiedTopology: true
}).catch((e) => {
    console.log(e);
});
const connect = mongoose.connection;
connect.once("open", function () {
    console.log("MongoDB database connection established successfully");
});

app.use(express.json());
app.use('/product', productRouter);
app.use('/order', orderRouter);


app.use((req, res, next) => {
    const error = new Error();
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`));