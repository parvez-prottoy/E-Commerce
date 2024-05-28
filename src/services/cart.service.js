const CartModel = require("../models/cart.model");
const objectId = require("../utility/objectID");

const createCartListService = async (req) => {
  try {
    const userID = new objectId(req.headers.userID);
    let reqBody = req.body;
    reqBody.userID = userID;
    await CartModel.create(reqBody);
    return { status: "success", message: "Cart List Create Successfully" };
  } catch (error) {
    return { status: "fail", data: error.message };
  }
};
const deleteCartListService = async (req) => {
  try {
    const userID = new objectId(req.headers.userID);
    let reqBody = req.body;
    reqBody.userID = userID;
    await CartModel.deleteOne(reqBody);
    return { status: "success", message: "Cart List Delete Successfully" };
  } catch (error) {
    return { status: "fail", data: error.message };
  }
};
const updateCartListService = async (req) => {
  try {
    const userID = new objectId(req.headers.userID);
    const { cartID } = req.params;
    const reqBody = req.body;
    await CartModel.updateOne({ _id: cartID, userID }, { $set: reqBody });
    return { status: "success", message: "Cart List Update Successfully" };
  } catch (error) {
    return { status: "fail", data: error.message };
  }
};
const cartListsService = async (req) => {
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
    const data = await CartModel.aggregate([
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

module.exports = {
  createCartListService,
  deleteCartListService,
  updateCartListService,
  cartListsService,
};
