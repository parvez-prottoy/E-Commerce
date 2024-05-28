const {
  userLoginService,
  verifyLoginService,
  createUpdateProfileService,
  readProfileService,
} = require("../services/user.service");

const userLogin = async (req, res) => {
  const result = await userLoginService(req);
  if (result.status === "success") {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
};
const verifyLogin = async (req, res) => {
  const result = await verifyLoginService(req);
  if (result.status === "success") {
    // cookies set
    const cookieOption = {
      expires: new Date(Date.now() + 24 * 6060 * 1000),
      httpOnly: false,
    };
    res.cookie("token", result["token"], cookieOption);
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
};
const userLogout = async (req, res) => {
  const cookieOption = {
    expires: new Date(Date.now() - 24 * 6060 * 1000),
    httpOnly: false,
  };
  res.cookie("token", "", cookieOption);
  res.status(200).json({ status: "success", message: "User Logout" });
};
const createProfile = async (req, res) => {
  const result = await createUpdateProfileService(req);
  if (result.status === "success") {
    res.status(201).json(result);
  } else {
    res.status(500).json(result);
  }
};
const updateProfile = async (req, res) => {
  const result = await createUpdateProfileService(req);
  if (result.status === "success") {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
};
const readProfile = async (req, res) => {
  const result = await readProfileService(req);
  if (result.status === "success") {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
};

module.exports = {
  userLogin,
  verifyLogin,
  userLogout,
  createProfile,
  updateProfile,
  readProfile,
};
