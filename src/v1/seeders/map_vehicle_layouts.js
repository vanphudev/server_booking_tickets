"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert(
         "map_vehicle_layouts",
         [
            {
                layout_name: "Sơ đồ xe A"
            },
            {
                layout_name: "Sơ đồ xe B"
            },
            {
                layout_name: "Sơ đồ xe C"
            },
            {
                layout_name: "Sơ đồ xe D"
            },
            {
                layout_name: "Sơ đồ xe E"
            },
         ],
         {}
      );
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("map_vehicle_layouts", null, {});
   },
};
