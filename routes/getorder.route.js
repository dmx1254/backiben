const express = require("express");
const getOrderController = require("../controllers/getorder.controller");

const router = express.Router();

//Orders routes

router.post("/", getOrderController.createOrder);
router.get("/", getOrderController.getAllOrders);
router.get("/ordernum/:numorder", getOrderController.getOrderByNumOrder);
router.put("/:id", getOrderController.updateOrder);
router.post("/paid", getOrderController.updatePaid);
router.post("/updatepayment", getOrderController.updatePayment);
router.get("/find/:userId", getOrderController.getUserOrder);
router.get("/income", getOrderController.getIncome);
router.delete("/:id", getOrderController.deleteOrder);

module.exports = router;
