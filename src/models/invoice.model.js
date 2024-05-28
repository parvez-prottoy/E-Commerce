const mongoose = require("mongoose");

const invoiceSchema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    payable: {
      type: String,
      required: true,
    },
    cusDetails: {
      type: String,
      required: true,
    },
    shipDetails: {
      type: String,
      required: true,
    },
    tranID: {
      type: String,
      required: true,
    },
    valID: {
      type: String,
      required: true,
    },
    deliveryStatus: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      required: true,
    },
    total: {
      type: String,
      required: true,
    },
    vat: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const InvoiceModel = mongoose.model("Invoices", invoiceSchema);

module.exports = InvoiceModel;
