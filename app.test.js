const mongoose = require("mongoose");
const request = require("supertest");
const app = require("./app");
require("dot-env");
describe("Checking sanity functions", () => {
  //

  // Should fail without a body
  test("fail for no body", () => {
    return request(app)
      .post("/getentry")
      .send({})
      .expect(400)
      .then((response) => {
        expect(response.body.code).toBe(1);
        expect(response.body.msg).toBe(
          "Missing startDate, endDate, minCount or maxCount"
        );
      });
  });

  // Test to check for invalid startDate or endDate. Could be done twice with each param missing once to make sure it fails.
  test("fail for invalid startDate or enddate", () => {
    return request(app)
      .post("/getentry")
      .send({
        startDate: "invalid date",
        endDate: "2020-01-02",
        minCount: 0,
        maxCount: 1,
      })
      .expect(400)
      .then((response) => {
        expect(response.body.code).toBe(1);
        expect(response.body.msg).toBe("Invalid startDate or endDate");
      });
  });

  test("fail for invalid mincount and maxcount", () => {
    return request(app)
      .post("/getentry")
      .send({
        startDate: "2015-01-01",
        endDate: "2020-01-02",
        minCount: 1,
        maxCount: 0,
      })
      .expect(400)
      .then((response) => {
        expect(response.body.code).toBe(1);
        expect(response.body.msg).toBe("Invalid minCount or maxCount");
      });
  });
});

describe("Check if records are fetched on correct inputs", () => {
  beforeAll(() => {
    return mongoose.connect(process.env.MONGO_ADDRESS);
  });
  afterAll((done) => mongoose.disconnect(done));
  test("Fetch records", () => {
    return request(app)
      .post("/getentry")
      .send({
        startDate: "2014-01-01",
        endDate: "2020-01-02",
        minCount: 50,
        maxCount: 100,
      })
      .expect(200)
      .then((response) => {
        expect(response.body.code).toBe(0);
        expect(typeof response.body.records).toBe("object");
        expect(response.body.records.length).toBeGreaterThanOrEqual(0);
        expect(response.body.records[0].totalCount).toBeLessThanOrEqual(100);
      });
  });
});
