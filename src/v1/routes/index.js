const express = require("express");
const rootRouter = express.Router();
const asyncHandler = require("../middlewares/handleError");
const __RESPONSE = require("../core");
rootRouter.use("/private", require("./private"));
rootRouter.use("/public", require("./public"));
rootRouter.all(
   "*",
   asyncHandler(async (req, res, next) => {
      throw new __RESPONSE.MethodNotAllowedError({
         message: "Method Not Allowed",
         suggestion: "Please check your request " + `Method ${req.method} is not supported`,
         request: req,
      });
   })
);

module.exports = rootRouter;
