const nodemailer = require("nodemailer");

const emailSend = async (emailTo, emailText, emailSub) => {
  const transport = nodemailer.createTransport({
    host: "mail.teamrabbil.com",
    port: 25,
    secure: false,
    auth: { user: "info@teamrabbil.com", pass: "~sR4[bhaC[Qs" },
    tls: { rejectUnauthorized: false },
  });
  const mailOption = {
    from: "eCommerce <info@teamrabbil.com>",
    to: emailTo,
    subject: emailSub,
    text: emailText,
  };
  return await transport.sendMail(mailOption);
};

module.exports = emailSend;
