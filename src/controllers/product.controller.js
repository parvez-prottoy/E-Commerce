const {
  brandListService,
  categoryListService,
  sliderListService,
  listByBrandService,
  productsService,
  listByCategoryService,
  listByRemarkService,
  listBySmilerService,
  detailsService,
  listByKeywordService,
  reviewListService,
} = require("../services/product.service");

const productBrandList = async (req, res) => {
  const result = await brandListService();
  if (result.status === "success") {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
};
const productCategoryList = async (req, res) => {
  const result = await categoryListService();
  if (result.status === "success") {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
};
const productSliderList = async (req, res) => {
  const result = await sliderListService();
  if (result.status === "success") {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
};
const products = async (req, res) => {
  const result = await productsService();
  if (result.status === "success") {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
};
const productListByBrand = async (req, res) => {
  const result = await listByBrandService(req);
  if (result.status === "success") {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
};
const productListByCategory = async (req, res) => {
  const result = await listByCategoryService(req);
  if (result.status === "success") {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
};
const productListByRemark = async (req, res) => {
  const result = await listByRemarkService(req);
  if (result.status === "success") {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
};
const productListBySmiler = async (req, res) => {
  const result = await listBySmilerService(req);
  if (result.status === "success") {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
};
const productDetails = async (req, res) => {
  const result = await detailsService(req);
  if (result.status === "success") {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
};
const productListByKeyword = async (req, res) => {
  const result = await listByKeywordService(req);
  if (result.status === "success") {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
};
const productReviewList = async (req, res) => {
  const result = await reviewListService(req);
  if (result.status === "success") {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
};

module.exports = {
  productBrandList,
  productCategoryList,
  productDetails,
  products,
  productListByBrand,
  productListByCategory,
  productListByKeyword,
  productListByRemark,
  productListBySmiler,
  productReviewList,
  productSliderList,
};
