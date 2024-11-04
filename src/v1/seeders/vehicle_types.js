"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert(
         "vehicle_types",
         [
            {
                vehicle_type_name: "Xe khách"
            },
            {
                vehicle_type_name: "Xe buýt"
            },
            {
                vehicle_type_name: "Xe giường nằm"
            },
            {
                vehicle_type_name: "Xe limousine"
            },
            {
                vehicle_type_name: "Xe taxi"
            },
         ],
         {}
      );
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("vehicle_types", null, {});
   },
};
