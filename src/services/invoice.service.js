const CartModel = require("../models/cart.model");
const InvoiceModel = require("../models/invoice.model");
const InvoiceProductModel = require("../models/invoiceProduct.model");
const PaymentSettingModel = require("../models/paymentSetting");
const ProfileModel = require("../models/profile.model");
const objectId = require("../utility/objectID");
const FormData = require("form-data");
const axios = require("axios");

const createInvoiceService = async (req) => {
  try {
    const userID = new objectId(req.headers.userID);
    const { email } = req.headers;

    // ! calculate total payable & vat
    const matchStage = { $match: { userID } };
    const joinWithProductStage = {
      $lookup: {
        from: "products",
        localField: "productID",
        foreignField: "_id",
        as: "product",
      },
    };
    const unwindProductStage = { $unwind: "$product" };
    const cartProducts = await CartModel.aggregate([
      matchStage,
      joinWithProductStage,
      unwindProductStage,
    ]);
    let totalAmount = 0;
    cartProducts.forEach((element) => {
      let price;
      if (element.product["discount"]) {
        price = parseFloat(element.product["discountPrice"]);
      } else {
        price = parseFloat(element.product["price"]);
      }
      totalAmount += parseFloat(element.qty) * price;
    });
    const vat = totalAmount * 0.05; //? 5% vat
    const payable = totalAmount + vat;
    // ! Prepare customer details & shipping details
    const profile = await ProfileModel.aggregate([matchStage]);
    const cusDetails = `Name: ${profile[0]["cusName"]}, Email: ${email}, Address: ${profile[0]["cusAdd"]}, Phone: ${profile[0]["cusPhone"]}, `;
    const shipDetails = `Name: ${profile[0]["shipName"]}, Email: ${email}, City: ${profile[0]["shipCity"]}, Phone: ${profile[0]["shipPhone"]},`;
    // ! Transaction & Others ID
    const tranID = Math.floor(10000000 + Math.random() * 90000000);
    const valID = 0;
    const deliveryStatus = "Pending";
    const paymentStatus = "Pending";
    // ! Create Invoice
    const createInvoice = await InvoiceModel.create({
      userID,
      payable,
      cusDetails,
      shipDetails,
      tranID,
      valID,
      deliveryStatus,
      paymentStatus,
      total: totalAmount,
      vat,
    });
    // ! Create Invoice Product
    const invoiceID = createInvoice["_id"];
    cartProducts.forEach(async (element) => {
      await InvoiceProductModel.create({
        userID,
        invoiceID,
        productID: element["productID"],
        qty: element["qty"],
        price: element.product["discount"]
          ? element.product["discountPrice"]
          : element.product["price"],
        color: element["color"],
        size: element["size"],
      });
    });
    // ! Remove Carts
    await CartModel.deleteMany({ userID });
    // ! Prepare SSL Payment
    const paymentSetting = await PaymentSettingModel.find();
    const form = new FormData();
    form.append("store_id", paymentSetting[0]["storeID"]);
    form.append("store_passwd", paymentSetting[0]["storePasswd"]);
    form.append("total_amount", payable.toString());
    form.append("currency", paymentSetting[0]["currency"]);
    form.append("tran_id", tranID);
    form.append("success_url", `${paymentSetting[0]["successURL"]}/${tranID}`);
    form.append("fail_url", `${paymentSetting[0]["failURL"]}/${tranID}`);
    form.append("cancel_url", `${paymentSetting[0]["cancelURL"]}/${tranID}`);
    form.append("ipn_url", paymentSetting[0]["ipnURL"]);
    form.append("init_url", paymentSetting[0]["initURL"]);

    form.append("cus_name", profile[0]["cusName"]);
    form.append("cus_email", email);
    form.append("cus_add1", profile[0]["cusAdd"]);
    form.append("cus_city", profile[0]["cusCity"]);
    form.append("cus_state", profile[0]["cusState"]);
    form.append("cus_postcode", profile[0]["cusPostcode"]);
    form.append("cus_country", profile[0]["cusCountry"]);
    form.append("cus_phone", profile[0]["cusPhone"]);
    form.append("cus_fax", profile[0]["cusPhone"]);

    form.append("shipping_method", "YES");
    form.append("ship_name", profile[0]["shipName"]);
    form.append("ship_email", email);
    form.append("ship_add1", profile[0]["shipAdd"]);
    form.append("ship_city", profile[0]["shipCity"]);
    form.append("ship_state", profile[0]["shipState"]);
    form.append("ship_postcode", profile[0]["shipPostcode"]);
    form.append("ship_country", profile[0]["shipCountry"]);
    form.append("ship_phone", profile[0]["shipPhone"]);
    form.append("products", "eCommerce");
    form.append("product_name", "Product");
    form.append("product_category", "eCommerce Shop Category");
    form.append("product_profile", "eCommerce Shop profile");
    form.append("product_amount", "According Invoice");

    const SSLRes = await axios.post(paymentSetting[0]["initURL"], form);

    return { status: "success", data: SSLRes.data };
  } catch (error) {
    return { status: "fail", data: error.message };
  }
};
const paymentSuccessService = async (req) => {
  try {
    const trxID = req.params.trxID;
    console.log(trxID);
    await InvoiceModel.updateOne(
      { tranID: trxID },
      { paymentStatus: "success" }
    );
    return { status: "success", message: "Payment success" };
  } catch (error) {
    return { status: "fail", message: error.message };
  }
};
const paymentFailService = async (req) => {
  try {
    const trxID = req.params.trxID;
    await InvoiceModel.updateOne({ tranID: trxID }, { paymentStatus: "fail" });
    return { status: "fail", message: "Payment fail" };
  } catch (error) {
    return { status: "fail", message: error.message };
  }
};
const paymentCancelService = async (req) => {
  try {
    const trxID = req.params.trxID;
    await InvoiceModel.updateOne(
      { tranID: trxID },
      { paymentStatus: "cancel" }
    );
    return { status: "cancel", message: "Payment cancel" };
  } catch (error) {
    return { status: "fail", message: error.message };
  }
};
const paymentIPNService = async (req) => {
  try {
    const trxID = req.params.trxID;
    const status = req.body["status"];
    await InvoiceModel.updateOne({ tranID: trxID }, { paymentStatus: status });
    return { status };
  } catch (error) {
    return { status: "fail", message: error.message };
  }
};

const invoiceListService = async (req) => {
  try {
    const { userID } = req.headers;
    const invoices = await InvoiceModel.find({ userID });
    return { status: "success", data: invoices };
  } catch (error) {
    return { status: "fail", data: error.message };
  }
};
const invoiceProductListService = async (req) => {
  try {
    const userID = new objectId(req.headers.userID);
    const invoiceID = new objectId(req.params.invoiceID);
    const matchStage = { $match: { userID, invoiceID } };
    const joinWithProductStage = {
      $lookup: {
        from: "products",
        localField: "productID",
        foreignField: "_id",
        as: "product",
      },
    };
    const unwindProductStage = { $unwind: "$product" };
    const data = await InvoiceProductModel.aggregate([
      matchStage,
      joinWithProductStage,
      unwindProductStage,
    ]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.message };
  }
};

module.exports = {
  invoiceListService,
  invoiceProductListService,
  paymentCancelService,
  paymentFailService,
  paymentIPNService,
  paymentSuccessService,
  createInvoiceService,
};
