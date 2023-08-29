const express = require("express");

const checkEmailController = require("../controllers/checkEmail.controller");

//Check e-mail routes

const router = express.Router();

router.post("/", checkEmailController.sendCode);
router.post("/verifycode", checkEmailController.verify);
router.post("/code/reset", checkEmailController.getCodeVerify);

module.exports = router;
