const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    employee_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Employees",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Products", productSchema);
