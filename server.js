const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDb = require("./config/db");
const router = require("./routes/todo");
const authRouter = require("./routes/auth");
const uploadRouter = require("./routes/upload");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);
app.use("/auth", authRouter);
app.use("/api/upload", uploadRouter);

// Serve uploaded file
app.use("/uploads", express.static("uploads"));

const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDb();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to database:", error.message);
    process.exit(1);
  }
};

startServer();