const { validationResult, body, check } = require("express-validator");
const router = require("express").Router();

router.post("/", body("username").isEmail(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    return res.status(200).json({
      message: "validation success",
    });
  }
});

module.exports = router;
