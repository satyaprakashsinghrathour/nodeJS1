 const express = require('express')
 const app = express()
//  const router = require("./app")
 const productRouter = require("./api/routes/product")
 const port = process.env.PORT || 3000
 app.use('/product', productRouter);

 app.listen(port, () => console.log(`Example app listening on port ${port}!`))



 ///////