const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        completed: {
            type: Boolean,
            default: false
        },
        date: {
            type: String,
            required: true
        },
        carriedFrom: {
            type: String,
            default: null
        },
        completedAt: {
            type: Date,
            default: null
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;