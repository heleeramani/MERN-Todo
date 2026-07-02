const Todo = require("../models/todo");

// Create a new todo
const createTodos = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Required Data Missing" });
    }

    const todo = await Todo.create({ title, description, user: req.user.id });

    return res
      .status(201)
      .json({ status: 201, message: "Todo Created Successfully", data: todo });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllTodos = async (req, res) => {
  try {
    const {
      page,
      limit,
      title,
      description,
      completed,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;0.

    const currentPage = parseInt(page);
    const pageLimit = parseInt(limit);
    const skip = (currentPage - 1) * pageLimit;

    const filter = {
      user: req.user.id,
    };

    // search by title
    if (title) {
      filter.title = {
        $regex: title,
        $options: "i",
      };
    }

    // search by description
    if (description) {
      filter.description = {
        $regex: description,
        $options: "i",
      };
    }

    // filter by completed
    if (completed) {
      filter.completed = completed === "true";
    }

    // sorting
    const sort = {
      [sortBy]: sortOrder === "asc" ? 1 : -1,
    };

    // data
    const todos = await Todo.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(pageLimit);  

    const total = await Todo.countDocuments(filter);

    return res.status(200).json({
      success: true,

      pagination: {
        totalRecords: total,
        currentPage,
        totalPages: Math.ceil(total / pageLimit),
        limit: pageLimit,
      },

      data: todos,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findById({ id, user: req.user.id });
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    return res
      .status(200)
      .json({ message: "fetched successfully", data: todo });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findByIdAndDelete({ id, user: req.user.id });
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    return res
      .status(200)
      .json({ message: "deleted Successfully", data: todo });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createTodos,
  getAllTodos,
  getTodo,
  deleteTodo,
};