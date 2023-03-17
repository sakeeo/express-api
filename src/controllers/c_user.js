const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const db = require("../models/index");
const User = db.User;

const getAll = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).send({
      message: "success",
      data: users,
    });
  } catch (e) {
    res.status(500).send({
      message: "gagal mengambil data",
      error_message: e.message,
    });
  }
};

const getByid = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.status(200).send({
      message: "success",
      data: user,
    });
  } catch (e) {
    res.status(500).send({
      message: "gagal mengambil data",
      error_message: e.message,
    });
  }
};

const deleteById = async (req, res) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(201).send({
      message: `user ${req.params.id} deleted`,
    });
  } catch (e) {
    res.status(500).send({
      message: "gagal menghapus data",
      error_message: e.message,
    });
  }
};

const updateById = async (req, res) => {
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

    const match = await bcrypt.compare(req.body.old_password, user.password);
    if (!match) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const newPassMatch = req.body.new_password === req.body.retype_password;
    if (!newPassMatch) {
      return res.status(401).send({
        accessToken: null,
        message: "retype password not match",
      });
    }
    var hashPassword = bcrypt.hashSync(req.body.new_password, 10);
    User.sync({ alter: true })
      .then(() => {
        return User.update(
          {
            fullName: req.body.fullName,
            email: req.body.email,
            password: hashPassword,
            role: req.body.role,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        );
      })
      .then((data) => {
        res.status(201).send({
          message: `user ${req.params.id} updated`,
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

module.exports = {
  getByid,
  getAll,
  deleteById,
  updateById,
};
