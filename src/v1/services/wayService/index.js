"use strict";
const __RESPONSE = require("../../core");
const {validationResult} = require("express-validator");
const db = require("../../models");

const getAllWays = async (req) => {
   return await db.Way.findAll({
      attributes: ["way_id", "way_name", "way_description"],
      include: [
         {
            model: db.Office,
            as: "way_to_office",
            attributes: [
               "office_id",
               "office_name",
               "office_address",
               "office_phone",
               "office_fax",
               "office_description",
               "office_latitude",
               "office_longitude",
               "office_map_url",
            ],
            through: {
               model: db.PickupPoint,
               as: "PickupPoint",
               attributes: ["pickup_point_time", "pickup_point_kind", "pickup_point_description", "point_kind_name"],
            },
         },
      ],
      nest: true,
      raw: true,
   })
      .then((ways) => {
         if (!ways) {
            throw new __RESPONSE.NotFoundError({
               message: "Resource not found - Ways not found !",
               suggestion: "Please check your request",
               request: req,
            });
         }
         const groupedWays = ways.reduce((acc, current) => {
            const wayId = current.way_id;
            if (!acc[wayId]) {
               acc[wayId] = {
                  way_id: current.way_id,
                  way_name: current.way_name,
                  way_description: current.way_description,
                  offices: [],
               };
            }
            acc[wayId].offices.push(current.way_to_office);
            return acc;
         }, {});
         return {
            ways: Object.values(groupedWays),
            total: ways.length,
         };
      })
      .catch((error) => {
         throw new __RESPONSE.BadRequestError({
            message: "Error in getting all ways " + error.message,
            suggestion: "Please check your request",
            request: req,
         });
      });
};

const getWayById = async (req) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }
   const {wayId} = req.query;
   return await db.Way.findAll({
      where: {
         way_id: wayId,
      },
      attributes: ["way_id", "way_name", "way_description"],
      include: [
         {
            model: db.Office,
            as: "way_to_office",
            attributes: [
               "office_id",
               "office_name",
               "office_address",
               "office_phone",
               "office_fax",
               "office_description",
               "office_latitude",
               "office_longitude",
               "office_map_url",
            ],
            through: {
               model: db.PickupPoint,
               as: "PickupPoint",
               attributes: ["pickup_point_time", "pickup_point_kind", "pickup_point_description", "point_kind_name"],
            },
         },
      ],
      nest: true,
      raw: true,
   })
      .then((way) => {
         if (!way || way.length === 0) {
            throw new __RESPONSE.NotFoundError({
               message: "Resource not found - Way not found !",
               suggestion: "Please check your request",
               request: req,
            });
         }
         const groupedWays = way.reduce((acc, current) => {
            const wayId = current.way_id;
            if (!acc[wayId]) {
               acc[wayId] = {
                  way_id: current.way_id,
                  way_name: current.way_name,
                  way_description: current.way_description,
                  offices: [],
               };
            }
            acc[wayId].offices.push(current.way_to_office);
            return acc;
         }, {});
         return {
            way: Object.values(groupedWays),
            total: way.length,
         };
      })
      .catch((error) => {
         if (error instanceof __RESPONSE.NotFoundError) {
            throw error;
         }
         throw new __RESPONSE.BadRequestError({
            message: "Error in getting way by id " + error.message,
            suggestion: "Please check your request",
            request: req,
         });
      });
};

const createWay = async (req) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }
   const {name, description} = req.body;
   return await db.Way.create({
      way_name: name,
      way_description: description,
   })
      .then((way) => {
         if (!way) {
            throw new __RESPONSE.BadRequestError({
               message: "Error in creating way",
               suggestion: "Please check your request",
               request: req,
            });
         }
         return {way};
      })
      .catch((error) => {
         if (error instanceof __RESPONSE.BadRequestError) {
            throw error;
         }
         if (error.original?.code === "ER_DUP_ENTRY") {
            throw new __RESPONSE.BadRequestError({
               message: "Way already exists " + error.original.sqlMessage,
               suggestion: "Please check your request",
               request: req,
            });
         }
         throw new __RESPONSE.BadRequestError({
            message: "Error in creating way",
            suggestion: "Please check your request",
            request: req,
         });
      });
};

const updateWay = async (req) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }
   const {wayId, name, description} = req.body;
   const way = await db.Way.findOne({
      where: {
         way_id: wayId,
      },
   });
   if (!way) {
      throw new __RESPONSE.NotFoundError({
         message: "Resource not found - Ways not found !",
         suggestion: "Please check your request",
         request: req,
      });
   }
   return await way
      .update({
         way_name: name,
         way_description: description,
      })
      .then((way) => {
         if (!way) {
            throw new __RESPONSE.BadRequestError({
               message: "Error in updating way",
               suggestion: "Please check your request",
               request: req,
            });
         }
         return {way};
      })
      .catch((error) => {
         if (error instanceof __RESPONSE.BadRequestError) {
            throw error;
         }
         if (error.original?.code === "ER_DUP_ENTRY") {
            throw new __RESPONSE.BadRequestError({
               message: "Way already exists " + error.original.sqlMessage,
               suggestion: "Please check your request",
               request: req,
            });
         }
         throw new __RESPONSE.BadRequestError({
            message: "Error in updating way",
            suggestion: "Please check your request",
            request: req,
         });
      });
};

const deleteWay = async (req) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      throw new __RESPONSE.BadRequestError({
         message: "Validation failed " + errors.array()[0]?.msg + " !",
         suggestion: "Please provide the correct data",
         request: req,
      });
   }
   const {wayId} = req.query;
   const way = await db.Way.findOne({
      where: {
         way_id: wayId,
      },
   });
   if (!way) {
      throw new __RESPONSE.NotFoundError({
         message: "Resource not found - Ways not found !",
         suggestion: "Please check your request",
         request: req,
      });
   }
   return await way
      .destroy()
      .then((way) => {
         if (!way) {
            throw new __RESPONSE.NotFoundError({
               message: "Resource not found - Ways not found !",
               suggestion: "Please check your request",
               request: req,
            });
         }
         return {way};
      })
      .catch((error) => {
         if (error instanceof __RESPONSE.BadRequestError) {
            throw error;
         }
         if (error.original && error.original.code === "ER_ROW_IS_REFERENCED_2") {
            throw new __RESPONSE.BadRequestError({
               message: "Way is referenced by other tables",
               suggestion: "Please check your request",
               request: req,
            });
         }
         throw new __RESPONSE.BadRequestError({
            message: "Error in deleting way",
            suggestion: "Please check your request",
            request: req,
         });
      });
};

const findAllDeletedWay = async (req) => {
   return await db.Way.findAll({
      where: {
         deleted_at: {[db.Sequelize.Op.ne]: null},
      },
      attributes: ["way_id", "way_name", "way_description"],
      include: [
         {
            model: db.Office,
            as: "way_to_office",
            attributes: [
               "office_id",
               "office_name",
               "office_address",
               "office_phone",
               "office_fax",
               "office_description",
               "office_latitude",
               "office_longitude",
               "office_map_url",
            ],
            through: {
               model: db.PickupPoint,
               as: "PickupPoint",
               attributes: ["pickup_point_time", "pickup_point_kind", "pickup_point_description", "point_kind_name"],
            },
         },
      ],
      order: [["deleted_at", "DESC"]],
      paranoid: false,
      nest: true,
      raw: true,
   })
      .then((way) => {
         if (!way || way.length === 0) {
            throw new __RESPONSE.NotFoundError({
               message: "Resource not found - Way not found !",
               suggestion: "Please check your request",
               request: req,
            });
         }
         const groupedWays = way.reduce((acc, current) => {
            const wayId = current.way_id;
            if (!acc[wayId]) {
               acc[wayId] = {
                  way_id: current.way_id,
                  way_name: current.way_name,
                  way_description: current.way_description,
                  offices: [],
               };
            }
            acc[wayId].offices.push(current.way_to_office);
            return acc;
         }, {});
         return {
            way: Object.values(groupedWays),
            total: Object.values(groupedWays).length,
         };
      })
      .catch((error) => {
         if (error instanceof __RESPONSE.BadRequestError) {
            throw error;
         }
         throw new __RESPONSE.BadRequestError({
            message: "Error in finding all deleted ways",
            suggestion: "Please check your request",
            request: req,
         });
      });
};

module.exports = {
   getAllWays,
   getWayById,
   createWay,
   updateWay,
   deleteWay,
   findAllDeletedWay,
};
