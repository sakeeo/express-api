var jwt = require("jsonwebtoken");
const db = require("../models/index");
const bcrypt = require("bcrypt");
const User = db.User;
const { validationResult } = require("express-validator");

exports.signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    const NewUser = {
      fullName: req.body.fullName,
      email: req.body.email,
      password: bcrypt.hash("sasasalksalksla", 10).then(function (hash) {
        return hash;
      }),
      role: req.body.role,
    };
    await User.create(NewUser);
    // delete NewUser.password;

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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    console.log(errors);
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
