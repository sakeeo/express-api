const UsersModel = require("../models/users");
const getAllUsers = async () => {
  try {
    const [data] = await UsersModel.getAllUsers();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const createNewUser = async (args) => {
  try {
    await UsersModel.createNewUser(args);
    console.log("user created");
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (args) => {
  try {
    await UsersModel.updateUser(args);
    console.log("user updated");
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (args) => {
  try {
    await UsersModel.deleteUser(args);
    console.log("user deleted");
  } catch (error) {
    console.log(error);
  }
};

const getByIdUser = async (id) => {
  try {
    const [data] = await UsersModel.getByIdUser(id);
    console.log({
      user: data,
    });
    return {
      user: data,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
  getByIdUser,
};
