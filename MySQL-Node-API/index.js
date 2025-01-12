const express = require("express");
const morgan = require("morgan");
const mySqlPool = require("./config/db");
const studentRoute = require("./routes/student.route.js");

const app = express();

//middleware
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/students", studentRoute);

// db connection check
mySqlPool
  .query("SELECT 1")
  .then(() => {
    console.log("MySQL DB connected");
  })
  .catch(() => {
    console.log("connection failed");
  });

app.listen(3000, () => console.log("server is running"));

app.get("/test", (req, res) => {
  res.status(200).send("hey");
});
