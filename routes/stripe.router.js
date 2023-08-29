const router = require("express").Router();

const stripController = require("../controllers/stripeController");

router.post("/", stripController.createStripPayment);
router.get("/banktransfert", stripController.createStripBankPayment);
router.get("/stripe-history", stripController.getAllCustomersPayments);
router.get("/square-cardpayment", stripController.CreateSquarePayment);

module.exports = router;
