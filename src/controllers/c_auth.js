var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const db = require("../models/index");
const { check, validationResult } = require("express-validator");
const User = db.User;

exports.signup = async (req, res) => {
  try {
    const NewUser = {
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    };
    await User.create(NewUser);
    delete NewUser.password;

    res.status(201).send({
      message: "register berhasil",
      data: NewUser,
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
    const user = await User.findOne({
      where: { email: req.body.email },
    });
    if (!user) {
      return res.status(404).send({
        message: "User Not found.",
      });
    }

    //comparing passwords
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    // checking if password was valid and send response accordingly
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
    //signing token with user id
    var token = jwt.sign(
      {
        id: user.id,
      },
      process.env.API_SECRET,
      {
        expiresIn: 86400,
      }
    );
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
