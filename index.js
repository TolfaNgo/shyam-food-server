const express = require("express");
const app = express();
const cors = require("cors");
const appRoutes = require("./server/routes/routes");
const { PORT } = require("./common/config");
require("./common/sequelize");

app.use(express.static("file"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add this line to parse form data

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api", appRoutes);
app.use("/", (req, res) => {
  res.send("OK");
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Now listening on port ` + PORT);
});
