const express = require("express");
const axios = require("axios");

const router = express.Router();

const CLIENT_ID = process.env.CLIENT_ID; // Remplacez par votre Client ID PayPal
const APP_SECRET = process.env.APP_SECRET; // Remplacez par votre Secret Key PayPal

// Route pour créer une commande PayPal
router.post("/create-paypal-order", async (req, res) => {
  try {
    const { currency_code, value } = req.body;
    const accessToken = await generateAccessToken();

    const order = await createOrder(currency_code, value, accessToken);
    res.json(order);
  } catch (error) {
    console.error("Erreur lors de la création de la commande PayPal :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la création de la commande PayPal" });
  }
});

// Route pour capturer le paiement PayPal
router.post("/capture-paypal-order", async (req, res) => {
  try {
    const { orderID } = req.body;
    const accessToken = await generateAccessToken();

    const captureData = await capturePayment(orderID, accessToken);
    res.json(captureData);
  } catch (error) {
    console.error("Erreur lors de la capture du paiement PayPal :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la capture du paiement PayPal" });
  }
});

// Fonction pour générer un jeton d'accès PayPal
async function generateAccessToken() {
  const auth = Buffer.from(CLIENT_ID + ":" + APP_SECRET).toString("base64");
  const response = await axios.post(
    "https://api-m.paypal.com/v1/oauth2/token",
    "grant_type=client_credentials",
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${auth}`,
      },
    }
  );

  const data = response.data;
  return data.access_token;
}

// Fonction pour créer une commande PayPal
async function createOrder(currencyCode, amount, accessToken) {
  const url = "https://api-m.paypal.com/v2/checkout/orders";
  const response = await axios.post(
    url,
    {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: currencyCode,
            value: amount,
          },
        },
      ],
      application_context: {
        return_url: "http://localhost:3000/payment-success",
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = response.data;
  return data;
}

// Fonction pour capturer un paiement PayPal
async function capturePayment(orderID, accessToken) {
  const url = `https://api-m.paypal.com/v2/checkout/orders/${orderID}/capture`;
  const response = await axios.post(url, null, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = response.data;
  return data;
}

// Route pour récupérer les détails d'une commande PayPal
router.post("/get-paypal-order-details", async (req, res) => {
  try {
    const { orderID } = req.body;
    const accessToken = await generateAccessToken();

    const orderDetails = await getOrderDetails(orderID, accessToken);
    // const infoPaymentUser = {
    //   emailAdress: orderDetails.payment_source.paypal.email_address,
    //   firstname: orderDetails.payment_source.paypal.name.given_name,
    //   lastanme: orderDetails.payment_source.paypal.name.surname,
    //   countryCode: orderDetails.payment_source.paypal.address.country_code,
    // }
    res.json(orderDetails);
  } catch (error) {
    console.error("Erreur lors de la récupération des détails de la commande PayPal :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des détails de la commande PayPal" });
  }
});


async function getOrderDetails(orderID, accessToken) {
  const url = `https://api-m.paypal.com/v2/checkout/orders/${orderID}`;
  const response = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = response.data;
  return data;
}






module.exports = router;
