const stripe = require("stripe")(
  "sk_test_51MExE2FnID2qcdOlG6eAy3MV8N64YGa8V2Bh0unugA12XV3P28BnrgYVrrfuH57Hduo64WMwx3cFPk8D4gLFwJjc00Jqp3BqMA"
);

const square = require("square");

const client = new square.Client({
  accessToken:
    "EAAAEToS6lSz8QNyU7F7T9s6ZCbclv1RBCpUNZBThk1sRgw-tQH0jnXVYGmPcHhZ",
  environment: "production", // or production
});

module.exports.createStripPayment = async (req, res) => {
  //   console.log(req.body.line_items);

  //   try {
  //     const session = await stripe.checkout.sessions.create({
  //       line_items: [
  //         {
  //           price_data: {
  //             currency: "eur",
  //             product_data: {
  //               name: "dofus kamas",
  //             },
  //             unit_amount: 2000,
  //           },
  //           quantity: 2,
  //         },
  //       ],
  //       payment_method_types: ["card", "ideal", "sofort", "giropay"],
  //       mode: "payment",
  //       success_url: `${process.env.CLIENT_URL}/checkout-success`,
  //       cancel_url: `${process.env.CLIENT_URL}/cart`,
  //     });

  //     res.send({ url: session.url });
  //   } catch (error) {
  //     res.status(400).json(error);
  //   }

  //   const storeItems = new Map([
  //     [1, { priceInCents: 10000, name: "Learn React Today" }],
  //     [2, { priceInCents: 20000, name: "Learn CSS Today" }],
  //   ]);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: req.body.pay,
      mode: "payment",
      line_items: req.body.line_items[0]?.products.map((item) => {
        // const storeItem = req.body.line_items[0].products.get(item.productId);
        return {
          price_data: {
            currency: req.body.devise,
            product_data: {
              name: item.category,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.amount,
        };
      }),
      success_url: `https://www.ibendouma.com/checkout-success`,
      cancel_url: `https://www.ibendouma.com/cart`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports.createStripBankPayment = async (req, res) => {
  const customer = await stripe.customers.create({
    description: "My First Test Customer (created for API docs)",
  });

  const intent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: "gbp",
    customer: customer.id,
    payment_method_types: ["customer_balance"],
    payment_method_data: {
      type: "customer_balance",
    },
    payment_method_options: {
      customer_balance: {
        funding_type: "bank_transfer",
        bank_transfer: {
          type: "gb_bank_transfer",
        },
      },
    },
  });
  res.json(intent);
};

module.exports.getAllCustomersPayments = async (req, res) => {
  await stripe.customers.list({ limit: 3 }).autoPagingEach(function (customer) {
    res.status(200).json(customer);
  });
};

// const Stripe = require('stripe');
// const stripe = Stripe('sk_test_51MExE2FnID2qcdOlG6eAy3MV8N64YGa8V2Bh0unugA12XV3P28BnrgYVrrfuH57Hduo64WMwx3cFPk8D4gLFwJjc00Jqp3BqMA');
// // In Node 10+:
// for await (const customer of stripe.customers.list({limit: 3})) {
//   // Do something with customer
// }

// // In other environments:
// stripe.customers.list({limit: 3})
//   .autoPagingEach(function(customer) {
//     // Do something with customer
//   });

module.exports.CreateSquarePayment = async (req, res) => {
  try {
    const response = await client.paymentsApi.createPayment({
      sourceId: "cnon:card-nonce-ok",
      idempotencyKey: "7717fb95-4670-42de-a3d2-2852c27de8f3",
      amountMoney: {
        amount: 100,
        currency: "USD",
      },
    });

    // console.log(response.result);
    res.status(200).json(response.result);
  } catch (error) {
    console.log(error);
  }
};
