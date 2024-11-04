"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert(
         "tags",
         [
            {
               tag_name: "Công nghệ" 
            },
            {
               tag_name: "Kinh doanh" 
            },
            {
               tag_name: "Thể thao" 
            },
            {
               tag_name: "Sức khỏe" 
            },
            {
               tag_name: "Giải trí" 
            }
         ],
         {}
      );
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("tags", null, {});
   },
};
