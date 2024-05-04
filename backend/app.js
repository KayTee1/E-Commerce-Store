const express = require("express");
const routes = require("./routes/index");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://172.16.6.158",
      "http://172.16.6.158:80",
      "http://172.16.6.158:5000",
      "http://172.16.6.158:8080",
    ],
    credentials: false,
  })
);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/health", (req, res) => {
  res.status(200).send({ message: "OK" });
});

app.use("/api", routes);

module.exports = app;
