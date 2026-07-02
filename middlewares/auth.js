const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(400).json({
                message: "authHeader is missing"
            })
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(400).json({
                message: "Token is missing"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

module.exports = auth;