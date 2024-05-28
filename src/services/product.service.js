const BrandModel = require("../models/brand.model");
const CategoryModel = require("../models/category.model");
const ProductModel = require("../models/product.model");
const ProductSliderModel = require("../models/productSlider.model");
const ReviewModel = require("../models/review.model");
const objectId = require("../utility/objectID");

const brandListService = async () => {
  try {
    const data = await BrandModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message };
  }
};
const categoryListService = async () => {
  try {
    const data = await CategoryModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message };
  }
};
const sliderListService = async () => {
  try {
    const data = await ProductSliderModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message };
  }
};
const productsService = async () => {
  try {
    const data = await ProductModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message };
  }
};
const listByBrandService = async (req) => {
  try {
    const brandID = new objectId(req.params.brandID);
    const matchStage = { $match: { brandID } };
    const joinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    const joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    const unwindBrandStage = { $unwind: "$brand" };
    const unwindCategoryStage = { $unwind: "$category" };
    const projectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        "brand.createdAt": 0,
        "brand.updatedAt": 0,
        "category.createdAt": 0,
        "category.updatedAt": 0,
        createdAt: 0,
        updatedAt: 0,
      },
    };
    const data = await ProductModel.aggregate([
      matchStage,
      joinWithBrandStage,
      joinWithCategoryStage,
      unwindBrandStage,
      unwindCategoryStage,
      projectionStage,
    ]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message };
  }
};
const listByCategoryService = async (req) => {
  try {
    const categoryID = new objectId(req.params.categoryID);
    const matchStage = { $match: { categoryID } };
    const joinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    const joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    const unwindBrandStage = { $unwind: "$brand" };
    const unwindCategoryStage = { $unwind: "$category" };
    const projectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        "brand.createdAt": 0,
        "brand.updatedAt": 0,
        "category.createdAt": 0,
        "category.updatedAt": 0,
        createdAt: 0,
        updatedAt: 0,
      },
    };
    const data = await ProductModel.aggregate([
      matchStage,
      joinWithBrandStage,
      joinWithCategoryStage,
      unwindBrandStage,
      unwindCategoryStage,
      projectionStage,
    ]);

    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message };
  }
};
const listByRemarkService = async (req) => {
  try {
    const { remark } = req.params;
    const matchStage = { $match: { remark } };
    const joinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    const joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    const unwindBrandStage = { $unwind: "$brand" };
    const unwindCategoryStage = { $unwind: "$category" };
    const projectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        "brand.createdAt": 0,
        "brand.updatedAt": 0,
        "category.createdAt": 0,
        "category.updatedAt": 0,
        createdAt: 0,
        updatedAt: 0,
      },
    };
    const data = await ProductModel.aggregate([
      matchStage,
      joinWithBrandStage,
      joinWithCategoryStage,
      unwindBrandStage,
      unwindCategoryStage,
      projectionStage,
    ]);

    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message };
  }
};
const listBySmilerService = async (req) => {
  try {
    const categoryID = new objectId(req.params.categoryID);
    const matchStage = { $match: { categoryID } };
    const limitStage = { $limit: 5 };
    const joinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    const joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    const unwindBrandStage = { $unwind: "$brand" };
    const unwindCategoryStage = { $unwind: "$category" };
    const projectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        "brand.createdAt": 0,
        "brand.updatedAt": 0,
        "category.createdAt": 0,
        "category.updatedAt": 0,
        createdAt: 0,
        updatedAt: 0,
      },
    };
    const data = await ProductModel.aggregate([
      matchStage,
      limitStage,
      joinWithBrandStage,
      joinWithCategoryStage,
      unwindBrandStage,
      unwindCategoryStage,
      projectionStage,
    ]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message };
  }
};
const detailsService = async (req) => {
  try {
    const productID = new objectId(req.params.productID);
    const matchStage = { $match: { _id: productID } };
    const joinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    const joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    const joinWithDetailsStage = {
      $lookup: {
        from: "productdetails",
        localField: "_id",
        foreignField: "productID",
        as: "details",
      },
    };
    const unwindBrandStage = { $unwind: "$brand" };
    const unwindCategoryStage = { $unwind: "$category" };
    const unwindDetailsStage = { $unwind: "$details" };
    const projectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        "brand.createdAt": 0,
        "brand.updatedAt": 0,
        "category.createdAt": 0,
        "category.updatedAt": 0,
        "details.createdAt": 0,
        "details.updatedAt": 0,
        createdAt: 0,
        updatedAt: 0,
      },
    };
    const data = await ProductModel.aggregate([
      matchStage,
      joinWithBrandStage,
      joinWithCategoryStage,
      joinWithDetailsStage,
      unwindBrandStage,
      unwindCategoryStage,
      unwindDetailsStage,
      projectionStage,
    ]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message };
  }
};
const listByKeywordService = async (req) => {
  try {
    const searchRegex = { $regex: req.params.keyword, $options: "i" };
    const searchParams = [{ title: searchRegex }, { shortDes: searchRegex }];
    const searchQuery = { $or: searchParams };
    const matchStage = { $match: searchQuery };
    const joinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    const joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    const unwindBrandStage = { $unwind: "$brand" };
    const unwindCategoryStage = { $unwind: "$category" };
    const projectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        "brand.createdAt": 0,
        "brand.updatedAt": 0,
        "category.createdAt": 0,
        "category.updatedAt": 0,
        createdAt: 0,
        updatedAt: 0,
      },
    };
    const data = await ProductModel.aggregate([
      matchStage,
      joinWithBrandStage,
      joinWithCategoryStage,
      unwindBrandStage,
      unwindCategoryStage,
      projectionStage,
    ]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message };
  }
};
const reviewListService = async (req) => {
  try {
    const productID = new objectId(req.params.productID);
    const matchStage = { $match: { productID } };
    const joinWithProfileStage = {
      $lookup: {
        from: "profiles",
        localField: "userID",
        foreignField: "userID",
        as: "profile",
      },
    };
    const unwindProfileStage = { $unwind: "$profile" };
    const projectionStage = {
      $project: {
        dis: 1,
        rating: 1,
        "profile.cus_name": 1,
      },
    };
    const data = await ReviewModel.aggregate([
      matchStage,
      joinWithProfileStage,
      unwindProfileStage,
      projectionStage,
    ]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message };
  }
};

module.exports = {
  brandListService,
  categoryListService,
  sliderListService,
  productsService,
  detailsService,
  listByBrandService,
  listByCategoryService,
  listByKeywordService,
  listByRemarkService,
  listBySmilerService,
  reviewListService,
};
