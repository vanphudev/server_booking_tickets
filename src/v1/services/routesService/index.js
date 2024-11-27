"use strict";
const __RESPONSE = require("../../core");
const db = require("../../models");
const {QueryTypes} = require("sequelize");

const getAllRoutes = async () => {
   try {
      const routes = await db.sequelize.query(
         `
         SELECT 
            po.province_id as origin_province_id,
            po.province_name as origin_province,
            do.district_name as origin_district,
            wo.ward_name as origin_ward,
            oo.office_name as origin_office,
            
            pd.province_id as destination_province_id,
            pd.province_name as destination_province,
            dd.district_name as destination_district,
            wd.ward_name as destination_ward,
            od.office_name as destination_office,
            
            vt.vehicle_type_name,
            
            r.route_price,
            r.route_duration,
            r.route_distance,
            r.route_id
            
         FROM routes r
         INNER JOIN offices oo ON r.origin_office_id = oo.office_id
         INNER JOIN wards wo ON oo.ward_id = wo.ward_id
         INNER JOIN districts do ON wo.district_id = do.district_id
         INNER JOIN provinces po ON do.province_id = po.province_id

         INNER JOIN offices od ON r.destination_office_id = od.office_id
         INNER JOIN wards wd ON od.ward_id = wd.ward_id
         INNER JOIN districts dd ON wd.district_id = dd.district_id
         INNER JOIN provinces pd ON dd.province_id = pd.province_id

         INNER JOIN trips t ON r.route_id = t.route_id
         INNER JOIN vehicles v ON t.vehicle_id = v.vehicle_id
         INNER JOIN vehicle_types vt ON v.vehicle_type_id = vt.vehicle_type_id

         WHERE r.deleted_at IS NULL
      `,
         {
            type: QueryTypes.SELECT,
         }
      );

      if (!routes) {
         throw new __RESPONSE.BadRequestError({
            message: "Routes not found !",
            suggestion: "Please check your request",
         });
      }

      return {
         routes: routes,
         total: routes.length,
      };
   } catch (error) {
      if (error instanceof __RESPONSE.BadRequestError) {
         throw error;
      }
      throw new __RESPONSE.InternalServerError({
         message: "Routes not found !",
         suggestion: "Please check your request",
      });
   }
};

module.exports = {
   getAllRoutes,
};
