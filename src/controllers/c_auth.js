var jwt = require("jsonwebtoken");
const db = require("../models/index");
const bcrypt = require("bcrypt");
const User = db.User;
const { validationResult } = require("express-validator");
const { generateAccessToken } = require("../middleware/auth");

exports.signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    var hashPassword = bcrypt.hashSync(req.body.password, 10);
    User.sync({ alter: true })
      .then(() => {
        return User.create({
          fullName: req.body.fullName,
          email: req.body.email,
          password: hashPassword,
          role: req.body.role,
        });
      })
      .then((data) => {
        res.status(201).send({
          message: "user created",
          data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: "register gagal",
          err_message: err.errors,
        });
      });
  } catch (e) {
    res.status(500).send({
      message: "register gagal",
      error_message: e.message,
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    const user = await User.findOne({
      where: { email: req.body.email },
    });
    if (!user) {
      return res.status(404).send({
        message: "User Not found.",
      });
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    //signing token with user id
    var token = generateAccessToken(req.body.email);
    //responding to client request with user profile success message and  access token .
    res.status(200).send({
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
      message: "Login berhasil login",
      accessToken: token,
    });
  } catch (e) {
    res.status(500).send({
      message: "gagal login",
      error_message: e.message,
    });
  }
};
