const Todo = require("../models/Todo");

const getToday = () => {
    return new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Manila"
    }).format(new Date());
};

const createTodo = async (req, res) => {
    try {
        const { title } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({ message: "Title is required" });
        }

        const today = getToday();

        const todo = await Todo.create({
            title: title.trim(),
            date: today,
            user: req.user.userId
        });

        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const getTodos = async (req, res) => {
    try {
        const today = getToday();

        const todos = await Todo.find({
            user: req.user.userId,
            date: today
        }).sort({ createdAt: -1 });

        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const getTodo = async (req, res) => {
    try {
        const todo = await Todo.findOne({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!todo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateTodo = async (req, res) => {
    try {
        const { title, completed } = req.body;

        const todo = await Todo.findOne({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        if (title !== undefined) {
            todo.title = title.trim();
        }

        if (completed !== undefined) {
            todo.completed = completed;
            todo.completedAt = completed ? new Date() : null;
        }

        await todo.save();

        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!todo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createTodo,
    getTodos,
    getTodo,
    updateTodo,
    deleteTodo
};