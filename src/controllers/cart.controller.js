const {
  createCartListService,
  deleteCartListService,
  cartListsService,
  updateCartListService,
} = require("../services/cart.service");

const createCartList = async (req, res) => {
  const result = await createCartListService(req);
  if (result.status === "success") {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
};
const updateCartList = async (req, res) => {
  const result = await updateCartListService(req);
  if (result.status === "success") {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
};
const deleteCartList = async (req, res) => {
  const result = await deleteCartListService(req);
  if (result.status === "success") {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
};
const cartLists = async (req, res) => {
  const result = await cartListsService(req);
  if (result.status === "success") {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
};

module.exports = {
  createCartList,
  updateCartList,
  deleteCartList,
  cartLists,
};
