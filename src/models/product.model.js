const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    shortDes: {
      type: String,
      require: true,
    },
    price: {
      type: String,
      require: true,
    },
    discount: {
      type: Boolean,
      require: true,
    },
    discountPrice: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    star: {
      type: String,
      require: true,
    },
    stock: {
      type: Boolean,
      require: true,
    },
    remark: {
      type: String,
      require: true,
    },
    categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    brandID: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
  },
  { timeStamps: true, versionKey: false }
);

const ProductModel = mongoose.model("Products", productSchema);

module.exports = ProductModel;
