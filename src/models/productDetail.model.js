const mongoose = require("mongoose");
const productDetailSchema = mongoose.Schema(
  {
    img1: {
      type: String,
      require: true,
    },
    img2: {
      type: String,
      require: true,
    },
    img3: {
      type: String,
      require: true,
    },
    img4: {
      type: String,
      require: true,
    },
    img5: {
      type: String,
    },
    img6: {
      type: String,
    },
    img7: {
      type: String,
    },
    img8: {
      type: String,
    },
    des: {
      type: String,
      require: true,
    },
    color: {
      type: String,
      require: true,
    },
    size: {
      type: Boolean,
      require: true,
    },
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
  },
  { timeStamps: true, versionKey: false }
);

const ProductDetailModel = mongoose.model(
  "ProductDetails",
  productDetailSchema
);

module.exports = ProductDetailModel;
