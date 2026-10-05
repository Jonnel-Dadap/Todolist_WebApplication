const Todo = require("../models/Todo");

const getToday = () => {
    return new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Manila"
    }).format(new Date());
};
const carryOverTodos = async (userId) => {
    const today = getToday();

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const yesterdayDate = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Manila"
    }).format(yesterday);

    const unfinishedTodos = await Todo.find({
        user: userId,
        date: yesterdayDate,
        completed: false
    });

    for (const todo of unfinishedTodos) {
        const alreadyCarried = await Todo.findOne({
            user: userId,
            title: todo.title,
            date: today,
            carriedFrom: yesterdayDate
        });

        if (!alreadyCarried) {
            await Todo.create({
                title: todo.title,
                completed: false,
                date: today,
                carriedFrom: yesterdayDate,
                user: userId
            });
        }
    }
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

        await carryOverTodos(req.user.userId);

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
const getHistory = async (req, res) => {
    try {
        const history = await Todo.aggregate([
            {
                $match: {
                    user: req.user.userId,
                    completed: true,
                    completedAt: { $ne: null }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$completedAt",
                            timezone: "Asia/Manila"
                        }
                    },
                    completedCount: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    _id: 1
                }
            }
        ]);

        res.json(history);
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};
module.exports = {
    createTodo,
    getTodos,
    getTodo,
    updateTodo,
    deleteTodo,
    getHistory
};