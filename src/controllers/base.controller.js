const getHome = (req, res) => {
  res.status(200).send("<h1>App Server is Running.</h1>");
};

module.exports = { getHome };
