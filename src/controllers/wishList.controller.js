const {
  createUpdateWishListService,
  removeWishListService,
  wishListsService,
} = require("../services/wishList.service");

const createWishList = async (req, res) => {
  const result = await createUpdateWishListService(req);
  if (result.status === "success") {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
};
const updateWishList = async (req, res) => {
  const result = await createUpdateWishListService(req);
  if (result.status === "success") {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
};
const removeWishList = async (req, res) => {
  const result = await removeWishListService(req);
  if (result.status === "success") {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
};
const wishLists = async (req, res) => {
  const result = await wishListsService(req);
  if (result.status === "success") {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
};

module.exports = { wishLists, createWishList, updateWishList, removeWishList };
