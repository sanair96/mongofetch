// regext to match date as YYYY-MM-DD
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

// Check if the given values are valid
const checkInputs = (req, res, next) => {
  const { startDate, endDate, minCount, maxCount } = req.body;
  if (
    startDate &&
    endDate &&
    minCount !== undefined &&
    maxCount !== undefined
  ) {
    if (dateRegex.test(startDate) && dateRegex.test(endDate)) {
      if (
        parseInt(minCount) >= 0 &&
        parseInt(maxCount) >= 0 &&
        minCount <= maxCount
      ) {
        next();
      } else {
        res.status(400).send({ code: 1, msg: "Invalid minCount or maxCount" });
      }
    } else {
      res.status(400).send({ code: 1, msg: "Invalid startDate or endDate" });
    }
  } else {
    res.status(400).send({
      code: 1,
      msg: "Missing startDate, endDate, minCount or maxCount",
    });
  }
};

module.exports = checkInputs;
