const express = require("express");
const cors = require("cors");
const connectDB = require("./config/conn");
const todoRoutes = require("./routes/todoRoutes");


const app = express();
const PORT = 5000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/todos", todoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running now in port: ${PORT}`);
});