const mongoose = require("mongoose");
const productSliderSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    des: {
      type: String,
      require: true,
    },
    price: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
  },
  { timeStamps: true, versionKey: false }
);

const ProductSliderModel = mongoose.model(
  "ProductSliders",
  productSliderSchema
);

module.exports = ProductSliderModel;
