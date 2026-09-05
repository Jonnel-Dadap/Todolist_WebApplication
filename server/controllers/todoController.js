const Todo = require("../models/Todo");

const createTodo = async (req, res) => { // para sa create
    try {
        const { title } = req.body;

        const todo = await Todo.create({
            title
        });

        res.status(201).json(todo);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getTodos = async (req, res) => { // para sa get ng data inside mongodb
    try {
        const todos = await Todo.find();

        res.status(200).json(todos);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const  getTodo = async (req, res) => { // for get specific user
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo){
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

const updateTodo = async (req, res) => { // change data inside database
  try {
    const todo = await Todo.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!todo) {
        return res.status(404).json({
            message: "Todo NOt found"
        });
    }
    res.status(200).json(todo);

  } catch (error) {
    res.status(500).json({
        message: error.message
    });
  }
};
const deleteTodo = async (req, res) => { // delete 
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if(!todo){
            return res.status(404).json({
                message: "Todo not foundd."
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