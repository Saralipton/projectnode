const { Router } = require("express");

const router = new Router();

const {
  createOrder,
  getAllOrders,
  getOrder,
  deleteOrder,
  updateOrder,
} = require("./controller");

router.post("/", createOrder);

router.get("/:id", getOrder);

router.delete("/:id", deleteOrder);

router.get("/get", getAllOrders);

router.put("/:id", updateOrder);

module.exports = router;
