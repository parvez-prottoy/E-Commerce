const {
  createCartList,
  deleteCartList,
  cartLists,
  updateCartList,
} = require("../controllers/cart.controller");
const { featuresLists } = require("../controllers/feature.controller");
const {
  createInvoice,
  invoiceList,
  invoiceProductList,
  paymentSuccess,
  paymentCancel,
  paymentFail,
  paymentIPN,
} = require("../controllers/invoice.controller");
const {
  productBrandList,
  productCategoryList,
  productSliderList,
  productListByBrand,
  productListByCategory,
  productListBySmiler,
  productListByKeyword,
  productListByRemark,
  productDetails,
  productReviewList,
  productListByFilter,
  products,
} = require("../controllers/product.controller");
const {
  userLogin,
  verifyLogin,
  userLogout,
  createProfile,
  updateProfile,
  readProfile,
} = require("../controllers/user.controller");
const {
  createWishList,
  updateWishList,
  removeWishList,
  wishLists,
} = require("../controllers/wishList.controller");
const authenticating = require("../middlewares/auth.middleware");

const router = require("express").Router();

// ? Products
router.get("/productBrandList", productBrandList);
router.get("/productCategoryList", productCategoryList);
router.get("/productSliderList", productSliderList);
router.get("/products", products);
router.get("/productListByBrand/:brandID", productListByBrand);
router.get("/productListByCategory/:categoryID", productListByCategory);
router.get("/productListByRemark/:remark", productListByRemark);
router.get("/productListBySmiler/:categoryID", productListBySmiler);
router.get("/productDetails/:productID", productDetails);
router.get("/productListByKeyword/:keyword", productListByKeyword);
router.get("/productReviewList/:productID", productReviewList);

// ? Users
router.get("/userOTP/:email", userLogin);
router.get("/verifyLogin/:email/:otp", verifyLogin);
router.get("/userLogout", authenticating, userLogout);

// ? Profile
router.post("/createProfile", authenticating, createProfile);
router.post("/updateProfile", authenticating, updateProfile);
router.get("/readProfile", authenticating, readProfile);

// ? Wish Lists
router.post("/createWist", authenticating, createWishList);
router.post("/updateWish", authenticating, updateWishList);
router.delete("/deleteWish", authenticating, removeWishList);
router.get("/wishLists", authenticating, wishLists);

// ? Carts
router.post("/createCartList", authenticating, createCartList);
router.delete("/deleteCartList", authenticating, deleteCartList);
router.patch("/updateCartList/:cartID", authenticating, updateCartList);
router.get("/cartLists", authenticating, cartLists);

// ? Invoice & Payment
router.get("/createInvoice", authenticating, createInvoice);
router.get("/invoiceList", authenticating, invoiceList);
router.get(
  "/invoiceProductList/:invoiceID",
  authenticating,
  invoiceProductList
);

router.post("/paymentSuccess/:trxID", paymentSuccess);
router.post("/paymentCancel/:trxID", paymentCancel);
router.post("/paymentFail/:trxID", paymentFail);
router.post("/paymentIPN/:trxID", paymentIPN);

// ? Features
router.get("/featuresLists", featuresLists);

module.exports = router;
