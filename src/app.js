const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const usersRouters = require("./routers/users");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/users", usersRouters);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
