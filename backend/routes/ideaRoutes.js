const express = require("express");
const router = express.Router();
const Idea = require("../models/Idea");
const generateAIReport = require("../utils/ai");

router.post("/", async (req, res) => {
    try {
        const { title, description } = req.body;

        const report = await generateAIReport({ title, description });

        const idea = await Idea.create({ title, description, report });

        res.json(idea);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/", async (req, res) => {
    const ideas = await Idea.find().sort({ createdAt: -1 });
    res.json(ideas);
});

router.get("/:id", async (req, res) => {
    const idea = await Idea.findById(req.params.id);
    res.json(idea);
});

router.delete("/:id", async (req, res) => {
    await Idea.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

module.exports = router;