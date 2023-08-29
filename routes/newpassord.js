const express = require("express");

const newPassWordController = require("../controllers/new.passwordConctroller");

//Check e-mail routes

const router = express.Router();

router.post("/", newPassWordController.createNewPass);

module.exports = router;
