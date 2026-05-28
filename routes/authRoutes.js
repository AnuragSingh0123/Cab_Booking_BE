const router = require("express").Router();
const { signUp, login, getUser, logout } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/sign-up", signUp);
router.post("/login", login);
router.get("/userAuth", authMiddleware, getUser);
router.post("/logout", logout);

module.exports = router;