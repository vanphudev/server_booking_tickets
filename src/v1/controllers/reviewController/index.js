"use strict";

const __RESPONSE = require("../../core");
const {
   getAllReviews,
} = require("../../services/reviewService");

const __REVIEW_CONTROLLER = {
   getAllReviews: async (req, res, next) => {
      new __RESPONSE.GET({
         message: "List of all reviews",
         metadata: await getAllReviews(req),
         request: req,
      }).send(res);
   },
   getOfficeById: async (req, res, next) => {
      new __RESPONSE.GET({
         message: "Office details",
         metadata: await getOfficeById(req),
         request: req,
      }).send(res);
   },
   createOffice: async (req, res, next) => {
      new __RESPONSE.CREATED({
         message: "Office created",
         metadata: await createOffice(req),
         request: req,
      }).send(res);
   },
   updateOffice: async (req, res, next) => {
      new __RESPONSE.UPDATE({
         message: "Office updated",
         metadata: await updateOffice(req),
         request: req,
      }).send(res);
   },
   deleteOffice: async (req, res, next) => {
      new __RESPONSE.DELETE({
         message: "Office deleted",
         metadata: await deleteOffice(req),
         request: req,
      }).send(res);
   },
   findAllDeletedOffice: async (req, res, next) => {
      new __RESPONSE.GET({
         message: "List of all deleted offices",
         metadata: await findAllDeletedOffice(req),
         request: req,
      }).send(res);
   },
};

module.exports = __REVIEW_CONTROLLER;
