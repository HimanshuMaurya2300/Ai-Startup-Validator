const mongoose = require("mongoose");

const IdeaSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        report: Object,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Idea", IdeaSchema);