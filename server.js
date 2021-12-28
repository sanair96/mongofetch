// The part where the server is created s

const mongoose = require("mongoose");
const APP_PORT = process.env.PORT || 3000;
require("dot-env");
const app = require("./app");

// connect to the database
mongoose
  .connect(process.env.MONGO_ADDRESS)
  // run app only if the connection is successful
  .then(() => {
    console.log("Connected to database");

    app.listen(APP_PORT, () => {
      console.log(`listening on port ${APP_PORT}`);
    });
  })
  .catch(() => {
    // critial failure. Fail fast
    console.log("Connection to DB failed");
    process.exit();
  });
