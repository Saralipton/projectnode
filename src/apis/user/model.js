const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { USER_ROLES } = require("./../../../constants");

const roles = [USER_ROLES.EMPLOYEE, USER_ROLES.USER];

const userSchema = new mongoose.Schema(
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
      enum: roles,
    },
  },
  {
    timestamps: true,
  }
);

/*
userSchema.pre("save", function (next) {
  let pass = this.password;
  if (!this.isModified("password")) return next();
  console.log(pass);
  bcrypt
    .hash(pass, 10)
    .then((hash) => {
      this.password = hash;
      next();
    })
    .catch((err) => {
      next(err);
    });
});
*/

userSchema.path("password").get((email) => {
  console.log(email);
});

//instance methods vs statics -> the only difference is static method can be called even
//when the object of the class is not initialized
userSchema.methods.test = function () {
  console.log(this); //this will refer to a document
  console.log("working");
};

userSchema.statics.findByName = function () {
  return this.find({ name: "daw" }); //this will refer to the collection
};

module.exports = mongoose.model("Users", userSchema);
