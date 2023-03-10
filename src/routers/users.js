const express = require("express");
const UserController = require("../controllers/users");
const router = express.Router();

router
  .post("/", UserController.createNewUser)
  .get("/", UserController.getAllUsers)
  .get("/:idUser", UserController.getByIdUser)
  .patch("/:idUser", UserController.updateUser)
  .delete("/:idUser", UserController.deleteUser);

module.exports = router;
