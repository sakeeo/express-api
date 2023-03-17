const userController = require("../controllers/c_user");
const { authenticateToken } = require("../middleware/auth");
const router = require("express").Router();
const { validator } = require("../middleware/validator");

router.get(
  "/",
  authenticateToken,
  userController.getAll,
  function (req, res, next) {}
);
router.get(
  "/:id",
  authenticateToken,
  userController.getByid,
  function (req, res, next) {}
);
router.delete(
  "/:id",
  authenticateToken,
  userController.deleteById,
  function (req, res, next) {}
);
router.patch(
  "/:id",
  authenticateToken,
  validator("update"),
  userController.updateById,
  function (req, res, next) {}
);

module.exports = router;
