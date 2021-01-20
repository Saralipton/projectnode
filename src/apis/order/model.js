const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Users",
    },
    status: {
      type: String,
      default: "places",
      enum: ["placed", "approved", "delivered"],
    },
    product_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Products",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Orders", orderSchema);
