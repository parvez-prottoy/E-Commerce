const notFoundHandler = (req, res, next) => {
  const err = new Error("Page Not Found!!!");
  err.status = 404;
  next(err);
};
const errorHandler = (err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
    });
  }
  return res.status(500).json({
    status: 500,
    message: "Server Error.",
  });
};
module.exports = { notFoundHandler, errorHandler };
