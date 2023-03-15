const db = require("../models/index");
const User = db.User;

const create = async (req, res) => {
  try {
    const NewUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).send({
      message: "berhasil meyimpan",
      data: NewUser,
    });
  } catch (e) {
    res.status(500).send({
      message: "gagal meyimpan",
      error_message: e.message,
    });
  }
};

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
    await User.update(
      {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    const updatedUser = await User.findByPk(req.params.id);
    res.status(200).send({
      message: `user ${req.params.id} updated`,
      data: updatedUser,
    });
  } catch (e) {
    res.status(500).send({
      message: "gagal mengubah data",
      error_message: e.message,
    });
  }
};

module.exports = {
  getByid,
  getAll,
  create,
  deleteById,
  updateById,
};
