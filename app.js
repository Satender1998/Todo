const express = require("express");
const app = express();
const cors = require("cors");
const conn = require("./conn/conn");
const path = require("path");

const list = require("./routes/list");
const auth = require("./routes/auth");

app.use(express.json());
app.use(cors());

app.use("/api/v1", auth);
app.use("/api/v2", list);

conn();

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "frontend", "build")));
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

app.listen(1000, () => {
  console.log("Server started");
});
