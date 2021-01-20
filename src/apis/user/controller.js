const User = require("./model");
const { notFound, success } = require("./../../services/responses");
const bcrypt = require("bcrypt");

const createUser = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        let error = new Error();
        error.message = "Email Already Exists!";
        error.statusCode = 409;
        throw error;
      }
      return bcrypt.hash(req.body.password, 10);
    })
    .then((hash) => {
      return User.create({
        email: req.body.email,
        name: req.body.name,
        contact: req.body.contact,
        password: hash,
        role: req.body.role === "employee" ? "employee" : "user",
      });
    })
    .then((user) => {
      return res.status(201).json({ ...user._doc });
    })
    .catch((err) => {
      next(err);
    });
};

const getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User Not Found" });
      }
      res.status(200).json({ user });
    })
    .catch((err) => {
      next(err);
    });
};

const deleteUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        let error = new Error();
        error.message = "User Not Found!";
        error.statusCode = 404;
        throw error;
      }
      return User.deleteOne({ _id: req.params.id });
    })
    .then(() => {
      return res.status(204).json({});
    })
    .catch((err) => {
      next(err);
    });
};

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).json({ users });
    })
    .catch((err) => {
      next(err);
    });
};

const updateUser = (req, res, next) => {
  User.findOneAndUpdate({ _id: req.params.id }, { ...req.body }, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User Not Found" });
      }
      res.status(200).json({ user });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  createUser,
  getUser,
  deleteUser,
  getAllUsers,
  updateUser,
};
