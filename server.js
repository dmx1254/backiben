const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const rateLimit = require("express-rate-limit");

const cors = require("cors");

const helmet = require("helmet");

const requestIp = require("request-ip");

require("./dbase/database");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");

//My routes folders
const userRoutes = require("./routes/users");
const productsRoutes = require("./routes/products");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");
const serverRouter = require("./routes/server");
const stripeRouter = require("./routes/stripe.router");
const contactRouter = require("./routes/contact");
const reviewRouter = require("./routes/review");
const checkEmailRouter = require("./routes/checkEmail");
const codeRoutes = require("./routes/code");
const euroRoutes = require("./routes/rateEuro.router");
const dollarRoutes = require("./routes/rateDollar.router");
const usdtRoutes = require("./routes/rateUsdt.router");
const gbpRoutes = require("./routes/rateGbp.router");
const cadRoutes = require("./routes/rateCad.router");
const rubRoutes = require("./routes/rateRub.router");
const chfRoutes = require("./routes/rateChf.router");
const madRoutes = require("./routes/mad.router");
const paypalRoutes = require("./routes/paypalapi");
const coinpalRoutes = require("./routes/coinpal");
const getorderRoutes = require("./routes/getorder.route");
// const cryptoRoutes = require("./routes/crypto.router");

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Fenêtre de temps (15 minutes en millisecondes)
  max: 100, // Nombre maximal de requêtes autorisées par fenêtre de temps
  message:
    "Trop de requêtes depuis cette adresse IP, veuillez réessayer plus tard.",
});

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};

app.use(cors(corsOptions));
app.use(requestIp.mw());
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: "deny" }));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.ieNoOpen());
app.use(helmet.referrerPolicy({ policy: "same-origin" }));
// app.disable("x-powered-by");

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());

app.get("*", limiter);
//Checking if user is connected or not for all get request
app.use("/api/products", productsRoutes);
app.use("/api/server", serverRouter);
app.use("/api/order", orderRouter);
app.use("/api/code", codeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/euro", euroRoutes);
app.use("/api/dollar", dollarRoutes);
app.use("/api/usdt", usdtRoutes);
app.use("/api/gbp", gbpRoutes);
app.use("/api/cad", cadRoutes);
app.use("/api/rub", rubRoutes);
app.use("/api/chf", chfRoutes);
app.use("/api/mad", madRoutes);
app.use("/api/create-checkout-session", stripeRouter);
app.use("/api/paypal", paypalRoutes);
app.use("/api/coinpal", coinpalRoutes);
app.use("/api/getorder", getorderRoutes);
// app.use("/api/pay-with-crypto", cryptoRoutes);

// app.get("*", checkUser);
// app.get("/jwtid", requireAuth, (req, res) => {
//   res.status(200).json({ id: res.locals.user._id, user: res.locals.user });
// });

//All my routes
app.use("/api/cart", cartRouter);
app.use("/api/contact", contactRouter);
app.use("/api/review", reviewRouter);
app.use("/api/checkemail", checkEmailRouter);

//My PORT
app.listen(process.env.PORT, () =>
  console.log(`server listening on port ${process.env.PORT}`)
);
