const express = require("express");

const router = express.Router();

//Codes routes
const codeController = require("../controllers/code.controller");

router.get("/", codeController.getAllCodes);
router.post("/", codeController.createCode);
router.post("/reset-password", codeController.createNewPass);
router.delete("/:id", codeController.removeCode);

module.exports = router;