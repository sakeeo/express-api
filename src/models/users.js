const dbPool = require("../config/database");

const getAllUsers = () => {
  const SQLQuery = "SELECT * FROM users";
  return dbPool.execute(SQLQuery);
};

const createNewUser = (args) => {
  const SQLQuery = `INSERT INTO users (username, email, password) 
                          VALUES ('${args.username}', '${args.email}', '${args.password}')`;
  return dbPool.execute(SQLQuery);
};

const updateUser = (args) => {
  const SQLQuery = `UPDATE users SET username='${args.username}', email='${args.email}', password='${args.password}'
                    WHERE id='${args.id}'`;
  return dbPool.execute(SQLQuery);
};

const deleteUser = (args) => {
  const SQLQuery = `DELETE FROM users WHERE id='${args.id}'`;
  return dbPool.execute(SQLQuery);
};

const getByIdUser = (id) => {
  const SQLQuery = `SELECT * FROM users WHERE id=${id}`;
  return dbPool.execute(SQLQuery);
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
  getByIdUser,
};
