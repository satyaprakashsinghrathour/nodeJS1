const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userDate = decoded;
        console.log("-------------");
        next();
    } catch (error) {
        return res.status(400).json({
            iam: " auth failedfadkls"
        });

    }
}