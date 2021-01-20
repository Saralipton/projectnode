const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    contact: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      default: "employee",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("employees", employeeSchema);
