const FeatureModel = require("../models/feature.model");

const featuresListsService = async () => {
  try {
    const data = await FeatureModel.find({});
    return { status: "success", data: data };
  } catch (error) {
    return { status: fail, message: error.message };
  }
};

module.exports = featuresListsService;
