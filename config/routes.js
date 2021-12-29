const records = require("../models/records");
const checkInputs = require("../helpers/sanityCheck");

const addPageRoutes = (app) => {
  app.post("/getrecords", checkInputs, (req, res) => {
    const { startDate, endDate, minCount, maxCount } = req.body;

    records
      .aggregate([
        {
          $match: {
            createdAt: {
              // Match all documents that have a createdAt field that is between the startDate and endDate
              $gte: new Date(startDate),
              $lte: new Date(endDate),
            },
          },
        },
        {
          // unwind the counts array so that they can be summed up at later stages
          $unwind: "$counts",
        },
        {
          $group: {
            // group by key and sum up the counts
            _id: "$key",
            createdAt: { $first: "$createdAt" },
            key: { $first: "$key" },
            totalCount: { $sum: "$counts" },
          },
        },
        {
          $match: {
            totalCount: {
              // Match all documents that have a totalCount field that is between the minCount and maxCount
              $gte: parseInt(minCount),
              $lte: parseInt(maxCount),
            },
          },
        },
        {
          $project: {
            _id: 0,
            key: 1,
            createdAt: 1,
            totalCount: 1,
          },
        },
        {
          $sort: {
            // Sort by totalCount in descending order
            totalCount: -1,
          },
        },
      ])
      .then((result) => {
        res.send({
          code: 0,
          msg: "success",
          records: result,
        });
      })
      .catch((err) => {
        res.status(500).send({
          code: 1,
          msg: "error",
        });
      });
  });
};

module.exports = addPageRoutes;
