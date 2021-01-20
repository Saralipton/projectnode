const { Router } = require("express");

const router = new Router();

const {
  createProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} = require("./controller");

router.post("/", createProduct);

router.get("/:id", getProduct);

router.delete("/:id", deleteProduct);

router.get("/get", getAllProducts);

router.put("/:id", updateProduct);

module.exports = router;
