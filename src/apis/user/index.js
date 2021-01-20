const { Router } = require("express");

const router = new Router();
const bodymen = require("bodymen");

const {
  createUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
} = require("./controller");

router.post(
  "/",
  bodymen.middleware({ title: { type: String, required: true } }),
  createUser
);

router.get("/:id", getUser);

router.delete("/:id", deleteUser);

router.get("/get", getAllUsers);

router.put("/:id", updateUser);

module.exports = router;
