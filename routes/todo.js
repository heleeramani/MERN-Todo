const express = require("express");
const { createTodos, getAllTodos, getTodo, deleteTodo } = require('../controllers/todo');
const auth = require('../middlewares/auth')

const Router = express.Router();

Router.post("/", auth, createTodos);

Router.get("/", auth, getAllTodos);

Router.get("/:id", auth, getTodo);

Router.delete("/:id", auth, deleteTodo);

module.exports = Router;