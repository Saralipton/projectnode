const Product = require("./model");

const createProduct = (req, res, next) => {
  Product.create({
    name: req.body.name,
    category: req.body.category,
    stock: req.body.stock,
    employee_id: req.body.employee_id,
  })
    .then((product) => {
      return res.status(201).json({ ...product._doc });
    })
    .catch((err) => {
      next(err);
    });
};

const getProduct = (req, res, next) => {
  Product.findById(req.params.id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product Not Found" });
      }
      res.status(200).json({ product });
    })
    .catch((err) => {
      next(err);
    });
};

const deleteProduct = (req, res, next) => {
  Product.findById(req.params.id)
    .then((product) => {
      if (!product) {
        let error = new Error();
        error.message = "Product Not Found!";
        error.statusCode = 404;
        throw error;
      }
      return Product.deleteOne({ _id: req.params.id });
    })
    .then(() => {
      return res.status(204).json({});
    })
    .catch((err) => {
      next(err);
    });
};

const getAllProducts = (req, res, next) => {
  Product.find({})
    .then((products) => {
      res.status(200).json({ products });
    })
    .catch((err) => {
      next(err);
    });
};

const updateProduct = (req, res, next) => {
  Product.findOneAndUpdate(
    { _id: req.params.id },
    { ...req.body },
    { new: true }
  )
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product Not Found" });
      }
      res.status(200).json({ product });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  createProduct,
  getProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
};
