const Order = require("./model");

const createOrder = (req, res, next) => {
  Order.create({
    status: req.body.status,
    user_id: req.body.user_id,
    product_id: req.body.product_id,
  })
    .then((order) => {
      return res.status(201).json({ ...order._doc });
    })
    .catch((err) => {
      next(err);
    });
};

const getOrder = (req, res, next) => {
  Order.findById(req.params.id)
    .populate(["user_id", "product_id"])
    .then((order) => {
      if (!order) {
        return res.status(404).json({ message: "Order Not Found" });
      }
      res.status(200).json({ order });
    })
    .catch((err) => {
      next(err);
    });
};

const deleteOrder = (req, res, next) => {
  Order.findById(req.params.id)
    .then((order) => {
      if (!order) {
        let error = new Error();
        error.message = "Order Not Found!";
        error.statusCode = 404;
        throw error;
      }
      return Order.deleteOne({ _id: req.params.id });
    })
    .then(() => {
      return res.status(204).json({});
    })
    .catch((err) => {
      next(err);
    });
};

const getAllOrders = (req, res, next) => {
  Order.find({})
    .then((orders) => {
      res.status(200).json({ orders });
    })
    .catch((err) => {
      next(err);
    });
};

const updateOrder = (req, res, next) => {
  Order.findOneAndUpdate({ _id: req.params.id }, { ...req.body }, { new: true })
    .then((order) => {
      if (!order) {
        return res.status(404).json({ message: "Order Not Found" });
      }
      res.status(200).json({ order });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  createOrder,
  getOrder,
  deleteOrder,
  getAllOrders,
  updateOrder,
};
