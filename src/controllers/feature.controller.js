const featuresListsService = require("../services/feature.service");

const featuresLists = async (req, res) => {
  const result = await featuresListsService();
  if (result.status === "success") {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
};

module.exports = { featuresLists };
