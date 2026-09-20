const Todo = require("../models/Todo");

const createTodo = async (req, res) => {
    try {
        const { title } = req.body;

        const todo = await Todo.create({
            title,
            user: req.user.userId
        });

        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTodos = async (req, res) => { // para sa get ng data inside mongodb
    try {
        const todos = await Todo.find({
            user: req.user.userId
        });

        res.status(200).json(todos);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
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
        const todo = await Todo.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.userId
            },
            req.body,
            { new: true }
        );

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