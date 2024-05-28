const mongoose = require("mongoose");

const profileSchema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    cusAdd: {
      type: String,
    },
    cusCity: {
      type: String,
    },
    cusCountry: {
      type: String,
    },
    cusName: {
      type: String,
    },
    cusPhone: {
      type: String,
    },
    cusPostcode: {
      type: String,
    },
    cusState: {
      type: String,
    },
    shipAdd: {
      type: String,
    },
    shipCity: {
      type: String,
    },
    shipCountry: {
      type: String,
    },
    shipName: {
      type: String,
    },
    shipPhone: {
      type: String,
    },
    shipPostcode: {
      type: String,
    },
    shipState: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

const ProfileModel = mongoose.model("Profiles", profileSchema);

module.exports = ProfileModel;
