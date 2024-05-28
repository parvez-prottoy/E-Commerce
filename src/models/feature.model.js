const mongoose = require("mongoose");

const featureSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    des: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const FeatureModel = mongoose.model("Features", featureSchema);

module.exports = FeatureModel;
