const OrderModel = require("../modals/order.model");
const ObjectId = require("mongoose").Types.ObjectId;

//Create order
module.exports.createOrder = async (req, res) => {
  const {
    userId,
    orderNum,
    paymentMethod,
    products,
    address,
    status,
    totalPrice,
    detailUser,
    paid,
    orderIdPaid,
    infoObjetctPay
  } = req.body;

  try {
    const savedOrder = await OrderModel.create({
      userId,
      orderNum,
      paymentMethod,
      products,
      address,
      status,
      totalPrice,
      detailUser,
      paid,
      orderIdPaid,
      infoObjetctPay
    });
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET ALL ORDERS
module.exports.getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.getOrderByNumOrder = async (req, res) => {
  const { numorder } = req.params;

  try {
    const getOrder = await OrderModel.findOne({ orderNum: numorder });
    res.status(200).json(getOrder);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

//Update status order
module.exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id))
    return res.status(400).json({ message: "ID unknown" });
  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      id,
      {
        $set: {
          status: req.body.status,
        },
      },
      { new: true, upsert: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.updatePaid = async (req, res) => {
  const { paid, orderId } = req.body;
  try {
    const updatedPaid = await OrderModel.findOneAndUpdate(
      {
        orderIdPaid: orderId,
      },
      { $set: { paid: paid } },
      { new: true }
    );
    res.status(200).json(updatedPaid);
  } catch (err) {
    res.status(500).json(err);
  }
};


module.exports.updatePayment = async (req, res) => {
  const { infoObjetctPay, orderId } = req.body;
  try {
    const updatedPayment = await OrderModel.findOneAndUpdate(
      {
        orderIdPaid: orderId,
      },
      { $set: { infoObjetctPay: infoObjetctPay } },
      { new: true }
    );
    res.status(200).json(updatedPayment);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Delete order
module.exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id))
    return res.status(400).json({ message: "ID unknown" });
  try {
    const orderDeleted = await OrderModel.findByIdAndDelete(id);
    res.status(200).json(orderDeleted);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get users order
module.exports.getUserOrder = async (req, res) => {
  try {
    const orders = await OrderModel.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get income for all product selling
module.exports.getIncome = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    // const getOrderSuccesded = await OrderModel.find({ status: "Terminée" });
    const income = await OrderModel.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          status: "Terminée",
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$totalPrice",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(400).json(err);
  }
};
