const userController = require("../controllers/c_user");
const router = require("express").Router();
const validator = require("../middleware/validator");

router.get("/", userController.getAll, function (req, res, next) {});
router.get("/:id", userController.getByid, function (req, res, next) {});
router.delete("/:id", userController.deleteById, function (req, res, next) {});
router.patch("/:id", userController.updateById, function (req, res, next) {});

module.exports = router;
