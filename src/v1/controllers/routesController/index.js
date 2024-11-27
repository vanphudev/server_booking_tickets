"use strict";
const __RESPONSE = require("../../core/");
const {getAllRoutes} = require("../../services/routesService");

const __ROUTES_CONTROLLER = {
   getRoutes: async (req, res, next) => {
      new __RESPONSE.GET({
         message: "List of all routes",
         metadata: await getAllRoutes(req),
         request: req,
      }).send(res);
   },
};

module.exports = __ROUTES_CONTROLLER;
