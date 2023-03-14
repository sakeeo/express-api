const db = require("../models/index");
const User = db.User;

const create = async (req, res) => {
  let data = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  const user = await User.create(data);
  res.status(200).send(user);
};

const getAll = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (e) {
    console.log(e);
  }
};

const getByid = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.status(200).send(user);
  } catch (e) {
    console.log(e);
  }
};

const deleteById = async (req, res) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send({
      message: `user ${req.params.id} deleted`,
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getByid,
  getAll,
  create,
  deleteById,
};
