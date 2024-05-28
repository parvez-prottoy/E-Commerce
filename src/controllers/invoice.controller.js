const {
  createInvoiceService,
  paymentFailService,
  paymentCancelService,
  paymentIPNService,
  paymentSuccessService,
  invoiceListService,
  invoiceProductListService,
} = require("../services/invoice.service");

const createInvoice = async (req, res) => {
  const result = await createInvoiceService(req);
  if (result.status === "success") {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
};
const paymentSuccess = async (req, res) => {
  const result = await paymentSuccessService(req);
  res.status(200).json(result);
};
const paymentFail = async (req, res) => {
  const result = await paymentFailService(req);
  res.status(200).json(result);
};
const paymentCancel = async (req, res) => {
  const result = await paymentCancelService(req);
  res.status(200).json(result);
};
const paymentIPN = async (req, res) => {
  const result = await paymentIPNService(req);
  res.status(200).json(result);
};
const invoiceList = async (req, res) => {
  const result = await invoiceListService(req);
  if (result.status === "success") {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
};
const invoiceProductList = async (req, res) => {
  const result = await invoiceProductListService(req);
  if (result.status === "success") {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
};

module.exports = {
  createInvoice,
  paymentFail,
  paymentCancel,
  paymentIPN,
  paymentSuccess,
  invoiceList,
  invoiceProductList,
};
