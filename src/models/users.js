const dbPool = require("../config/database");

const getAllUsers = () => {
  const SQLQuery = "SELECT * FROM users";
  return dbPool.execute(SQLQuery);
};

const createNewUser = (body) => {
  const SQLQuery = `  INSERT INTO users (username, email, password) 
                        VALUES ('${body.username}', '${body.email}', '${body.password}')`;
  return dbPool.execute(SQLQuery);
};

const updateUser = (body, idUser) => {
  const SQLQuery = `  UPDATE users 
                        SET username='${body.password}', email='${body.email}', password='${body.password}' 
                        WHERE id=${idUser}`;
  return dbPool.execute(SQLQuery);
};

const deleteUser = (idUser) => {
  const SQLQuery = `DELETE FROM users WHERE id=${idUser}`;
  return dbPool.execute(SQLQuery);
};

const getByIdUser = (idUser) => {
  const SQLQuery = `SELECT * FROM users WHERE id=${idUser}`;
  return dbPool.execute(SQLQuery);
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
  getByIdUser,
};
