const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

//Register
router.post("/register", async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const hash = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hash, role });
        await user.save();
        res.status(201).json({ message: "User berhasil dibuat" });
    } catch (err) {
        res.status(400).json({ error: "Gagal register: " + err.message });
    }
});

//Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: "Email tidak dtemukan" });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ error: "Password salah!" });

        const adminToken = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
        res.json({ adminToken });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});
module.exports = router;