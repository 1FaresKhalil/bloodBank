exports.getIndex = async (req, res, next) => {
  res.send(req.ip);
  console.log(req.ip);
};
