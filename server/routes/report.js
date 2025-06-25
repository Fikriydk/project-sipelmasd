const express = require("express");
const router = express.Router();
const Report = require("../models/Report");
const { verifyToken } = require("../middleware/authMiddleware");

//Create
router.post("/", async (req, res) => {
    try {
        const newReport = new Report(req.body);
        const saved = await newReport.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//Read
router.get("/", verifyToken, async (req,res) => {
    try {
        const reports = await Report.find();
        res.json(reports);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//Read by ID
router.get("/:id", verifyToken, async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) return re.status(404).json({ error: "Not found"});
        res.json(report);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//Update
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const updated = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//Delete
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        await Report.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully"});
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

module.exports = router;