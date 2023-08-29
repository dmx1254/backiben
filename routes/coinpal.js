const express = require("express");
const axios = require("axios");
const crypto = require("crypto");

const { v4: uuidv4 } = require('uuid');

const router = express.Router();

function hashData(data) {
  const secretKey =
    "796aaee83677535b48ddc3090e360b91833b754b24277539f684f636a232cf01";
  const sha256Hash = crypto.createHash("sha256");
  sha256Hash.update(
    secretKey +
      data.requestId +
      data.merchantNo +
      data.orderNo +
      data.orderAmount +
      data.orderCurrency
  );
  return sha256Hash.digest("hex");
}

router.post("/make-payment", async (req, res) => {
  const clientIp = req.clientIp;
  const { currency, amount, email, description, orderNum } = req.body;
  try {
    const data = {
      version: "2",
      requestId: uuidv4(),
      merchantNo: "100000464",
      merchantName: "Cionpal",
      orderNo: orderNum,
      orderCurrencyType: "fiat",
      orderCurrency: currency,
      orderAmount: amount,
      payerEmail: email,
      orderDescription: description,
      payerIP: clientIp,
      notifyURL: "https://www.ibendouma.com?order=MER12345678910",
      redirectURL: "https://www.ibendouma.com/payment-coinpal-success",
      cancelURL: "https://www.ibendouma.com",
      successUrl: "https://www.ibendouma.com/payment-coinpal-success",

      remark: "Remark",
    };

    // Calculer le hash
    data.sign = hashData(data);

    // Faire la requête vers CoinPal
    const coinPalUrl = "https://pay.coinpal.io/gateway/pay/checkout";
    const response = await axios.post(coinPalUrl, data);
    const order_data = response.data;

    // Traiter la réponse de CoinPal ici selon vos besoins spécifiques
    res.status(200).json(order_data);
  } catch (error) {
    console.error("Erreur lors du paiement :", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
