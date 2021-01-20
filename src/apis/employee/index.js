const { Router } = require("express");
const bodymen = require("bodymen");

const router = new Router();

const {
  createEmployee,
  getAllEmployees,
  getEmployee,
  deleteEmployee,
  updateEmployee,
} = require("./controller");

router.post(
  "/",
  bodymen.middleware({ name: { type: String, required: true } }),
  createEmployee
);

router.get("/get", getAllEmployees);

router.get("/:id", getEmployee);

router.delete("/:id", deleteEmployee);

router.put("/:id", updateEmployee);

module.exports = router;
