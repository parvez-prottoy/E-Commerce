const ProfileModel = require("../models/profile.model");
const UserModel = require("../models/user.model");
const emailSend = require("../utility/email.util");
const objectId = require("../utility/objectID");
const { encodeToken } = require("../utility/token.util");

const userLoginService = async (req) => {
  try {
    const { email } = req.params;
    const code = Math.floor(100000 + Math.random() * 900000);
    const text = `Your Verification Code is ${code}`;
    const sub = "Email Verification.";
    await emailSend(email, text, sub);
    const data = await UserModel.updateOne(
      { email },
      { $set: { otp: code } },
      { upsert: true }
    );
    return { status: "success", message: "6 Digit OTP has been send." };
  } catch (error) {
    return { status: "fail", message: error.message };
  }
};
const verifyLoginService = async (req) => {
  try {
    const { email, otp } = req.params;
    const user = await UserModel.find({ email, otp });
    if (user.length > 0) {
      const userID = user[0]._id.toString();
      const token = encodeToken(email, userID);
      await UserModel.updateOne({ email }, { $set: { otp: 0 } });
      return { status: "success", message: "Valid OTP", token: token };
    } else {
      return { status: "fail", message: "Invalid OTP" };
    }
  } catch (error) {
    return { status: "fail", message: error.message };
  }
};
const createUpdateProfileService = async (req) => {
  try {
    const { userID } = req.headers;
    let reqBody = req.body;
    reqBody.userID = new objectId(userID);
    await ProfileModel.updateOne(
      { userID },
      { $set: reqBody },
      { upsert: true }
    );
    return { status: "success", message: "Profile Save Success", reqBody };
  } catch (error) {
    return { status: "fail", message: error.message };
  }
};
const readProfileService = async (req) => {
  try {
    const { userID } = req.headers;
    const data = await ProfileModel.findOne(
      { userID },
      { createdAt: 0, updatedAt: 0 }
    );
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", message: error.message };
  }
};

module.exports = {
  userLoginService,
  verifyLoginService,
  createUpdateProfileService,
  readProfileService,
};
