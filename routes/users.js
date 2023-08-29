const express = require("express");
const userController = require("../controllers/users.controller");
const authController = require("../controllers/auth.controller");

const router = express.Router();

//Users routes
router.post("/register", authController.signUp);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
// router.post("/reset", authController.createNewPassword);
router.get("/v2/stats", userController.getStats);
router.get("/", userController.getAllUsers);
router.post("/createnewpassword", authController.createPassword);
router.post("/create-comment", userController.createComment);
router.get("/create-comment", userController.getAllComments);
router.put("/create-comment/:id", userController.updateComment);
router.delete("/create-comment/:id", userController.deleteComment);
router.get("/:id", userController.getOneUser);
router.get("/:mail", userController.getMail);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
