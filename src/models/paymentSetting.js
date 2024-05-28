const mongoose = require("mongoose");

const paymentSettingSchema = mongoose.Schema(
  {
    storeID: {
      type: String,
      required: true,
    },
    storePasswd: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    successURL: {
      type: String,
      required: true,
    },
    failURL: {
      type: String,
      required: true,
    },
    cancelURL: {
      type: String,
      required: true,
    },
    ipnURL: {
      type: String,
      required: true,
    },
    initURL: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const PaymentSettingModel = mongoose.model(
  "PaymentSettings",
  paymentSettingSchema
);

module.exports = PaymentSettingModel;
