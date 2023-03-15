const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routers
app.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});
app.use(authRouter);
app.use("/user", userRouter);
app.get("/", (req, res) => {
  res.json({
    message: "selamat datang",
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
