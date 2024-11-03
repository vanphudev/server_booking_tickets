"use strict";

const __RESPONSE = require("../../core");
const {
   getAllOfficeImages,
   getOfficeImageById,
   createOfficeImage,
   getOfficeByOfficeId,
   updateOfficeImage,
   deleteOfficeImage,
} = require("../../services/officeImageService");

const __OFFICE_IMAGE_CONTROLLER__ = {
   createOfficeImage: async (req, res, next) => {
      new __RESPONSE.CREATED({
         message: "Create office image successfully",
         metadata: await createOfficeImage(req, res, next),
         request: req,
      }).send(res);
   },
   getOfficeByOfficeId: async (req, res, next) => {
      console.log("req.body", req.body);
      req.office = await getOfficeByOfficeId(req, res, next);
      next();
   },
};

module.exports = __OFFICE_IMAGE_CONTROLLER__;
