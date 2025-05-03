const HttpError = require("../exceptions/HttpError");

module.exports = function (err, req, res, next) {
  console.log("MID ERROR", err);
  if (err instanceof HttpError) {
    return res.status(err.status).json({ message: err.message });
  }

  return res.status(500).json({ message: err });
};
