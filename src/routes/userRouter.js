const userController = require("../controllers/c_user");
const router = require("express").Router();

router.get("/", userController.getAll);
router.get("/:id", userController.getByid);
router.delete("/:id", userController.deleteById);
router.post("/", userController.create);

module.exports = router;
