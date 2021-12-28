// App component separated out so that it can be tested independently

const app = require("express")();
const addPageRoutes = require("./config/routes");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

addPageRoutes(app);

module.exports = app;
