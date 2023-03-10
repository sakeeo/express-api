const createUser = (req, res) => {
  res.status(201).json({
    message: "create user success",
    data: req.body,
  });
};
const getUsers = (req, res) => {
  res.status(200).json({
    message: "get user success",
  });
};
const getUserById = (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    message: "get user by id success",
    id: id,
  });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    message: "update user by id success",
    id: id,
    data: req.body,
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    message: "delete user by id success",
    id: id,
  });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
