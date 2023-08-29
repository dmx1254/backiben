// const fetch = require("node-fetch");

// //usdt

// module.exports.createCryptoPayment = async (req, res) => {
//   try {
//     async function run() {
//       const query = new URLSearchParams({
//         apikey:
//           "lRBfqAeXI4r8xdPeht9VWPtSMGJEuZc5hA42FphgQkdwjIHSMhfbB4I1jRH7XTCP",
//         callback: "https://www.ibendouma.com",
//         address: "TMRducv3utPLFMX2tkQ6ik687Jrzm14kKr",
//         pending: "1",
//         confirmations: "1",
//         email: "payment@ibendouma.com",
//         post: "0",
//         priority: "string",
//         multi_token: "0",
//         multi_chain: "0",
//         convert: "0",
//       }).toString();

//       const ticker = "trc20/usdt";
//       const resp = await fetch(
//         `https://api.blockbee.io/${ticker}/create/?${query}`,
//         { method: "GET" }
//       );

//       const data = await resp.json();
//       res.status(200).json(data);
//     }

//     run();
//   } catch (error) {
//     res.status(400).json(error);
//   }
// };

// module.exports.createCryptoQrcode = async (req, res) => {
//   try {
//     async function run() {
//       const query = new URLSearchParams({
//         apikey:
//           "lRBfqAeXI4r8xdPeht9VWPtSMGJEuZc5hA42FphgQkdwjIHSMhfbB4I1jRH7XTCP",
//         address: "TMRducv3utPLFMX2tkQ6ik687Jrzm14kKr",
//         value: "usdt",
//         size: "256",
//       }).toString();

//       const ticker = "trc20/usdt";
//       const resp = await fetch(
//         `https://api.blockbee.io/${ticker}/qrcode/?${query}`,
//         { method: "GET" }
//       );

//       const data = await resp.json();
//       res.status(200).json(data);
//     }

//     run();
//   } catch (error) {
//     res.status(400).json(error);
//   }
// };

// module.exports.getCurrencyCrypto = async (req, res) => {
//   try {
//     async function run() {
//       const query = new URLSearchParams({
//         apikey:
//           "lRBfqAeXI4r8xdPeht9VWPtSMGJEuZc5hA42FphgQkdwjIHSMhfbB4I1jRH7XTCP",
//         value: req.body.valuCur,
//         from: req.body.currency,
//       }).toString();

//       const ticker = "trc20/usdt";
//       const resp = await fetch(
//         `https://api.blockbee.io/${ticker}/convert/?${query}`,
//         { method: "GET" }
//       );

//       const data = await resp.json();
//       res.status(200).json(data);
//     }

//     run();
//   } catch (error) {
//     res.status(400).json(error);
//   }
// };

// //bitcoin
// module.exports.createCryptoBtcPayment = async (req, res) => {
//   try {
//     async function run() {
//       const query = new URLSearchParams({
//         apikey:
//           "lRBfqAeXI4r8xdPeht9VWPtSMGJEuZc5hA42FphgQkdwjIHSMhfbB4I1jRH7XTCP",
//         callback: "https://www.ibendouma.com",
//         address: "1FDfXsx5xwWgChXKHcYHJP2kN475mhHk8A",
//         pending: "1",
//         confirmations: "1",
//         email: "payment@ibendouma.com",
//         post: "0",
//         priority: "string",
//         multi_token: "0",
//         multi_chain: "0",
//         convert: "0",
//       }).toString();

//       const ticker = "trc20/btc";
//       const resp = await fetch(
//         `https://api.blockbee.io/${ticker}/create/?${query}`,
//         { method: "GET" }
//       );

//       const data = await resp.json();
//       res.status(200).json(data);
//     }

//     run();
//   } catch (error) {
//     res.status(400).json(error);
//   }
// };

// module.exports.createCryptoBtcQrcode = async (req, res) => {
//   try {
//     async function run() {
//       const query = new URLSearchParams({
//         apikey:
//           "lRBfqAeXI4r8xdPeht9VWPtSMGJEuZc5hA42FphgQkdwjIHSMhfbB4I1jRH7XTCP",
//         address: "1FDfXsx5xwWgChXKHcYHJP2kN475mhHk8A",
//         value: "btc",
//         size: "256",
//       }).toString();

//       const ticker = "trc20/btc";
//       const resp = await fetch(
//         `https://api.blockbee.io/${ticker}/qrcode/?${query}`,
//         { method: "GET" }
//       );

//       const data = await resp.json();
//       res.status(200).json(data);
//     }

//     run();
//   } catch (error) {
//     res.status(400).json(error);
//   }
// };

// module.exports.getCurrencyBtcCrypto = async (req, res) => {
//   try {
//     async function run() {
//       const query = new URLSearchParams({
//         apikey:
//           "lRBfqAeXI4r8xdPeht9VWPtSMGJEuZc5hA42FphgQkdwjIHSMhfbB4I1jRH7XTCP",
//         value: req.body.valuCur,
//         from: req.body.currency,
//       }).toString();

//       const ticker = "trc20/btc";
//       const resp = await fetch(
//         `https://api.blockbee.io/${ticker}/convert/?${query}`,
//         { method: "GET" }
//       );

//       const data = await resp.json();
//       res.status(200).json(data);
//     }

//     run();
//   } catch (error) {
//     res.status(400).json(error);
//   }
// };

// //eth

// module.exports.createCryptoEthPayment = async (req, res) => {
//   try {
//     async function run() {
//       const query = new URLSearchParams({
//         apikey:
//           "lRBfqAeXI4r8xdPeht9VWPtSMGJEuZc5hA42FphgQkdwjIHSMhfbB4I1jRH7XTCP",
//         callback: "https://www.ibendouma.com",
//         address: "0xad3b1bca4289fda67b416f086485538efaf3c3d2",
//         pending: "1",
//         confirmations: "1",
//         email: "payment@ibendouma.com",
//         post: "0",
//         priority: "string",
//         multi_token: "0",
//         multi_chain: "0",
//         convert: "0",
//       }).toString();

//       const ticker = "trc20/eth";
//       const resp = await fetch(
//         `https://api.blockbee.io/${ticker}/create/?${query}`,
//         { method: "GET" }
//       );

//       const data = await resp.json();
//       res.status(200).json(data);
//     }

//     run();
//   } catch (error) {
//     res.status(400).json(error);
//   }
// };

// module.exports.createCryptoEthQrcode = async (req, res) => {
//   try {
//     async function run() {
//       const query = new URLSearchParams({
//         apikey:
//           "lRBfqAeXI4r8xdPeht9VWPtSMGJEuZc5hA42FphgQkdwjIHSMhfbB4I1jRH7XTCP",
//         address: "0xad3b1bca4289fda67b416f086485538efaf3c3d2",
//         value: "eth",
//         size: "256",
//       }).toString();

//       const ticker = "trc20/eth";
//       const resp = await fetch(
//         `https://api.blockbee.io/${ticker}/qrcode/?${query}`,
//         { method: "GET" }
//       );

//       const data = await resp.json();
//       res.status(200).json(data);
//     }

//     run();
//   } catch (error) {
//     res.status(400).json(error);
//   }
// };

// module.exports.getCurrencyEthCrypto = async (req, res) => {
//   try {
//     async function run() {
//       const query = new URLSearchParams({
//         apikey:
//           "lRBfqAeXI4r8xdPeht9VWPtSMGJEuZc5hA42FphgQkdwjIHSMhfbB4I1jRH7XTCP",
//         value: req.body.valuCur,
//         from: req.body.currency,
//       }).toString();

//       const ticker = "trc20/eth";
//       const resp = await fetch(
//         `https://api.blockbee.io/${ticker}/convert/?${query}`,
//         { method: "GET" }
//       );

//       const data = await resp.json();
//       res.status(200).json(data);
//     }

//     run();
//   } catch (error) {
//     res.status(400).json(error);
//   }
// };

// //Pay with Glo Cash

// // const handleGlocash = async () => {
// //   await axios
// //     .post("https://sandbox.glocash.com/gateway/payment/index", {
// //       REQ_EMAIL: "payment@ibendouma.com",
// //       REQ_INVOICE: "ORDER9087HBFFT56",
// //       REQ_SIGN:
// //         "ee8f48e8b619960cd59da28719d25b451eb9b2661455412c1dd2d2f335bd0842",
// //       CUS_EMAIL: "tipox1254@gmail.com",
// //       BIL_PRICE: "37.86",
// //       URL_SUCCESS: "https://ibendouma.com//checkout-success",
// //     })
// //     .then(function (response) {
// //       console.log(response.json());
// //     })
// //     .catch(function (error) {
// //       console.log(error);
// //     });
// // };

// module.exports.payWithGlocash = async (req, res) => {
//   try {
//     const resp = await fetch(
//       "https://sandbox.glocash.com/gateway/payment/index",
//       {
//         method: "POST",
//         body: JSON.stringify(req.body),
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//     res.status(200).send(resp)
//   } catch (error) {
//     console.log(error);
//   }
// };

// //LTC PAYMENT CONTROLLER

// // module.exports.createCryptoLtcPayment = async (req, res) => {
// //   try {
// //     async function run() {
// //       const query = new URLSearchParams({
// //         apikey:
// //           "lRBfqAeXI4r8xdPeht9VWPtSMGJEuZc5hA42FphgQkdwjIHSMhfbB4I1jRH7XTCP",
// //         callback: "https://www.ibendouma.com",
// //         address: "LSB9c9StLikLAUMfWNU3WWH9ENBwrc1zPK",
// //         pending: "1",
// //         confirmations: "1",
// //         email: "payment@ibendouma.com",
// //         post: "0",
// //         priority: "string",
// //         multi_token: "0",
// //         multi_chain: "0",
// //         convert: "0",
// //       }).toString();

// //       const ticker = "bep20/ltc";
// //       const resp = await fetch(
// //         `https://api.blockbee.io/${ticker}/create/?${query}`,
// //         { method: "GET" }
// //       );

// //       const data = await resp.json();
// //       res.status(200).json(data);
// //     }

// //     run();
// //   } catch (error) {
// //     res.status(400).json(error);
// //   }
// // };

// // module.exports.createCryptoLtcQrcode = async (req, res) => {
// //   try {
// //     async function run() {
// //       const query = new URLSearchParams({
// //         apikey:
// //           "lRBfqAeXI4r8xdPeht9VWPtSMGJEuZc5hA42FphgQkdwjIHSMhfbB4I1jRH7XTCP",
// //         address: "LSB9c9StLikLAUMfWNU3WWH9ENBwrc1zPK",
// //         value: "ltc",
// //         size: "256",
// //       }).toString();

// //       const ticker = "bep20/ltc";
// //       const resp = await fetch(
// //         `https://api.blockbee.io/${ticker}/qrcode/?${query}`,
// //         { method: "GET" }
// //       );

// //       const data = await resp.json();
// //       res.status(200).json(data);
// //     }

// //     run();
// //   } catch (error) {
// //     res.status(400).json(error);
// //   }
// // };

// // module.exports.getCurrencyLtcCrypto = async (req, res) => {
// //   try {
// //     async function run() {
// //       const query = new URLSearchParams({
// //         apikey:
// //           "lRBfqAeXI4r8xdPeht9VWPtSMGJEuZc5hA42FphgQkdwjIHSMhfbB4I1jRH7XTCP",
// //         value: req.body.valuCur,
// //         from: req.body.currency,
// //       }).toString();

// //       const ticker = "bep20/ltc";
// //       const resp = await fetch(
// //         `https://api.blockbee.io/${ticker}/convert/?${query}`,
// //         { method: "GET" }
// //       );

// //       const data = await resp.json();
// //       res.status(200).json(data);
// //     }

// //     run();
// //   } catch (error) {
// //     res.status(400).json(error);
// //   }
// // };

// //BNB PAYMENT CONTROLLER

// // module.exports.createCryptoBnbPayment = async (req, res) => {
// //   try {
// //     async function run() {
// //       const query = new URLSearchParams({
// //         apikey:
// //           "lRBfqAeXI4r8xdPeht9VWPtSMGJEuZc5hA42FphgQkdwjIHSMhfbB4I1jRH7XTCP",
// //         callback: "https://www.ibendouma.com",
// //         address: "0xad3b1bca4289fda67b416f086485538efaf3c3d2",
// //         pending: "1",
// //         confirmations: "1",
// //         email: "payment@ibendouma.com",
// //         post: "0",
// //         priority: "string",
// //         multi_token: "0",
// //         multi_chain: "0",
// //         convert: "0",
// //       }).toString();

// //       const ticker = "trc20/eth";
// //       const resp = await fetch(
// //         `https://api.blockbee.io/${ticker}/create/?${query}`,
// //         { method: "GET" }
// //       );

// //       const data = await resp.json();
// //       res.status(200).json(data);
// //     }

// //     run();
// //   } catch (error) {
// //     res.status(400).json(error);
// //   }
// // };

// // module.exports.createCryptoBnbQrcode = async (req, res) => {
// //   try {
// //     async function run() {
// //       const query = new URLSearchParams({
// //         apikey:
// //           "lRBfqAeXI4r8xdPeht9VWPtSMGJEuZc5hA42FphgQkdwjIHSMhfbB4I1jRH7XTCP",
// //         address: "0xad3b1bca4289fda67b416f086485538efaf3c3d2",
// //         value: "eth",
// //         size: "256",
// //       }).toString();

// //       const ticker = "trc20/eth";
// //       const resp = await fetch(
// //         `https://api.blockbee.io/${ticker}/qrcode/?${query}`,
// //         { method: "GET" }
// //       );

// //       const data = await resp.json();
// //       res.status(200).json(data);
// //     }

// //     run();
// //   } catch (error) {
// //     res.status(400).json(error);
// //   }
// // };

// // module.exports.getCurrencyBnbCrypto = async (req, res) => {
// //   try {
// //     async function run() {
// //       const query = new URLSearchParams({
// //         apikey:
// //           "lRBfqAeXI4r8xdPeht9VWPtSMGJEuZc5hA42FphgQkdwjIHSMhfbB4I1jRH7XTCP",
// //         value: req.body.valuCur,
// //         from: req.body.currency,
// //       }).toString();

// //       const ticker = "trc20/eth";
// //       const resp = await fetch(
// //         `https://api.blockbee.io/${ticker}/convert/?${query}`,
// //         { method: "GET" }
// //       );

// //       const data = await resp.json();
// //       res.status(200).json(data);
// //     }

// //     run();
// //   } catch (error) {
// //     res.status(400).json(error);
// //   }
// // };
