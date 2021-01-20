const Employee = require("./model");
const bcrypt = require("bcrypt");

const createEmployee = (req, res, next) => {
  Employee.findOne({ email: req.body.email })
    .then((employee) => {
      if (employee) {
        let error = new Error();
        error.message = "Email Already Exists!";
        error.statusCode = 409;
        throw error;
      }
      return bcrypt.hash(req.body.password, 10);
    })
    .then((hash) => {
      return Employee.create({
        email: req.body.email,
        name: req.body.name,
        contact: req.body.contact,
        password: hash,
      });
    })
    .then((employee) => {
      return res.status(201).json({ ...employee._doc });
    })
    .catch((err) => {
      next(err);
    });
};

const getEmployee = (req, res, next) => {
  Employee.findById(req.params.id)
    .then((employee) => {
      if (!employee) {
        return res.status(404).json({ message: "Employee Not Found" });
      }
      res.status(200).json({ employee });
    })
    .catch((err) => {
      next(err);
    });
};

const deleteEmployee = (req, res, next) => {
  Employee.findById(req.params.id)
    .then((employee) => {
      if (!employee) {
        let error = new Error();
        error.message = "Employee Not Found!";
        error.statusCode = 404;
        throw error;
      }
      return Employee.deleteOne({ _id: req.params.id });
    })
    .then(() => {
      return res.status(204).json({});
    })
    .catch((err) => {
      next(err);
    });
};

const getAllEmployees = (req, res, next) => {
  Employee.find({})
    .then((employees) => {
      res.status(200).json({ employees });
    })
    .catch((err) => {
      next(err);
    });
};

const updateEmployee = (req, res, next) => {
  Employee.findOneAndUpdate(
    { _id: req.params.id },
    { ...req.body },
    { new: true }
  )
    .then((employee) => {
      if (!employee) {
        return res.status(404).json({ message: "Employee Not Found" });
      }
      res.status(200).json({ employee });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  createEmployee,
  getEmployee,
  deleteEmployee,
  getAllEmployees,
  updateEmployee,
};
