const express = require("express");
const router = express.Router();

const { createTodo, getTodos, getTodo, updateTodo, deleteTodo } = require("../controllers/todoController");
const  protect = require("../middleware/authMiddleware");

router.post("/",protect, createTodo);
router.get("/",protect, getTodos);
router.get("/:id",protect, getTodo);
router.put("/:id",protect, updateTodo);
router.delete("/:id",protect, deleteTodo);
module.exports = router;

