const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const apiRouter = require("./routers/index");
const bcrypt = require("bcrypt");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.text());

// routers
app.use("/auth", apiRouter.authRouter);
app.use("/user", apiRouter.userRouter);
app.get("/", (req, res, next) => {
  var pass = bcrypt.hash();
  console.log(pass);
  res.send({
    message: "it's work",
  });
});

//server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
