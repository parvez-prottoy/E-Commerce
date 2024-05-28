const mongoose = require("mongoose");
const brandSchema = mongoose.Schema(
  {
    brandName: {
      type: String,
      unique: true,
      require: true,
    },
    brandImg: {
      type: String,
      require: true,
    },
  },
  { timeStamps: true, versionKey: false }
);

const BrandModel = mongoose.model("Brands", brandSchema);

module.exports = BrandModel;
