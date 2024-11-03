const express = require("express");
const rootRouter = express.Router();

rootRouter.use("/type-customer", require("./typeCustomerAPI"));
rootRouter.use("/office", require("./officeAPI"));
rootRouter.use("/way", require("./wayAPI"));
rootRouter.use("/officeimage", require("./officeImageAPI"));

module.exports = rootRouter;
