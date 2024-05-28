const WishModel = require("../models/wish.model");
const objectId = require("../utility/objectID");

const wishListsService = async (req) => {
  try {
    const userID = new objectId(req.headers.userID);
    const matchStage = { $match: { userID } };
    const joinWithProductStage = {
      $lookup: {
        from: "products",
        localField: "productID",
        foreignField: "_id",
        as: "product",
      },
    };
    const joinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "product.brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    const joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "product.categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    const unwindProductStage = { $unwind: "$product" };
    const unwindBrandStage = { $unwind: "$brand" };
    const unwindCategoryStage = { $unwind: "$category" };
    const projectionStage = {
      $project: {
        "brand.createdAt": 0,
        "brand.updatedAt": 0,
        "category.createdAt": 0,
        "category.updatedAt": 0,
        "product.createdAt": 0,
        "product.updatedAt": 0,
        createdAt: 0,
        updatedAt: 0,
      },
    };
    const data = await WishModel.aggregate([
      matchStage,
      joinWithProductStage,
      joinWithBrandStage,
      joinWithCategoryStage,
      unwindProductStage,
      unwindBrandStage,
      unwindCategoryStage,
      projectionStage,
    ]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message };
  }
};
const createUpdateWishListService = async (req) => {
  try {
    const { userID } = req.headers;
    let reqBody = req.body;
    reqBody.userID = userID;
    const data = await WishModel.updateOne(
      reqBody,
      { $set: reqBody },
      { upsert: true }
    );
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message };
  }
};
const removeWishListService = async (req) => {
  try {
    const { userID } = req.headers;
    let reqBody = req.body;
    reqBody.userID = userID;
    const data = await WishModel.deleteOne(reqBody);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message };
  }
};

module.exports = {
  wishListsService,
  createUpdateWishListService,
  removeWishListService,
};
