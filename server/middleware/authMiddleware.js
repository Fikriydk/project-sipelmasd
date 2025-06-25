const jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const adminToken = authHeader && authHeader.split(" ")[1];

    if (!adminToken) {
        return res.status(401).json({ error: "Token tidak ditemukan"});
    }

    try {
        const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Token tidak valid" });
    }
}

module.exports = { verifyToken };