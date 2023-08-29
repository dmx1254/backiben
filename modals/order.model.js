// order model creating with mongoose
//It stock all my orders

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    orderNum: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
    },

    products: [
      {
        productId: { type: String, required: true },
        category: {
          type: String,
          required: true,
        },
        server: {
          type: String,
          required: true,
        },
        qty: { type: Number, required: true },
        amount: {
          type: Number,
          required: true,
        },
        price: { type: Number, required: true },
        character: {
          type: String,
          required: true,
        },
        image: {
          type: String,
        },
      },
    ],

    address: {
      type: String,
    },

    status: {
      type: String,
      default: "En attente...",
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    detailUser: {
      type: Object,
    },
    paid: {
      type: String,
      default: "En attente",
    },
    orderIdPaid: {
      type: String,
      default: "",
    },
    infoObjetctPay: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model("order", orderSchema);

module.exports = OrderModel;
