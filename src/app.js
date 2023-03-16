const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const validationRouter = require("./routes/validationRouter");
const bodyParser = require("body-parser");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.text());

// routers
app.use(authRouter);
app.use("/user", userRouter);
app.use("/product", validationRouter);
app.get("/", (req, res) => {
  res.json({
    message: "selamat datang",
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
