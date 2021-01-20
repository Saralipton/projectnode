const { Router } = require("express");
const router = new Router();

const User = require("./user");
const Employee = require("./employee");
const Product = require("./product");
const Order = require("./order");

router.use("/user", User);

router.use("/employee", Employee);

router.use("/product", Product);

router.use("/order", Order);

module.exports = router;
