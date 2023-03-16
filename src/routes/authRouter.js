const router = require("express").Router();
const authController = require("../controllers/c_auth");
const verifyToken = require("../middleware/auth");

router.post("/register", authController.signup, function (req, res) {});
router.post("/login", authController.signin, function (req, res) {});

router.get("/hiddencontent", verifyToken, function (req, res) {
  if (!user) {
    res.status(403).send({
      message: "Invalid JWT token",
    });
  }
  if (req.user == "admin") {
    res.status(200).send({
      message: "Congratulations! but there is no hidden content",
    });
  } else {
    res.status(403).send({
      message: "Unauthorised access",
    });
  }
});

module.exports = router;
