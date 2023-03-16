const router = require("express").Router();
const authController = require("../controllers/c_auth");
const { validator } = require("../middleware/validator");

router.post(
  "/register",
  validator("register"),
  authController.signup,
  (req, res, next) => {}
);
router.post(
  "/login",
  validator("login"),
  authController.signin,
  (req, res, nex) => {}
);

module.exports = router;
