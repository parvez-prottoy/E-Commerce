const mongoose = require("mongoose");
const categorySchema = mongoose.Schema(
  {
    categoryName: {
      type: String,
      unique: true,
      require: true,
    },
    categoryImg: {
      type: String,
      require: true,
    },
  },
  { timeStamps: true, versionKey: false }
);

const CategoryModel = mongoose.model("Categories", categorySchema);

module.exports = CategoryModel;
