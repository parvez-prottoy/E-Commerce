const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    otp: {
      type: String,
      require: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const UserModel = mongoose.model("Users", userSchema);

module.exports = UserModel;
