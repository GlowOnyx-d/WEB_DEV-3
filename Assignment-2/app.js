const express = require("express");
const app = express();

const logger = require("./middleware/logger");
const studentRoutes = require("./routes/studentRoutes");

app.use(express.json());
app.use(logger);

app.use("/students", studentRoutes);

app.get("/", function (req, res) {
  res.send("Student Management REST API is running");
});

const PORT = 3000;
app.listen(PORT, function () {
  console.log("Server running on http://localhost:" + PORT);
});
