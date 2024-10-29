const express = require("express");
const rootRouter = express.Router();
const typeCustomerRouter = require("./typeCustomerAPI");

rootRouter.use("/type-customer", typeCustomerRouter);

rootRouter.get("/", (req, res) => {
   res.json({
      message: "Welcome to the API v1",
   });
});
module.exports = rootRouter;
