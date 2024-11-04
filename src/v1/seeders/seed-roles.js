"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert(
         "roles",
         [
            {
               role_name: "Admin",
               role_description: "Quyền quản trị hệ thống",
               role_value_url: "/admin/dashboard",
               is_deleted: 0,
               is_locked: 0
            },
            {
               role_name: "Editor",
               role_description: "Quyền chỉnh sửa nội dung",
               role_value_url: "/editor/dashboard",
               is_deleted: 0,
               is_locked: 0
            },
            {
               role_name: "User",
               role_description: "Người dùng thông thường có thể xem nội dung",
               role_value_url: "/user/home",
               is_deleted: 0,
               is_locked: 0
            },
            {
               role_name: "Moderator",
               role_description: "Quyền kiểm duyệt bình luận và nội dung",
               role_value_url: "/moderator/dashboard",
               is_deleted: 0,
               is_locked: 0
            },
            {
               role_name: "Guest",
               role_description: "Khách truy cập, quyền hạn bị hạn chế",
               role_value_url: "/guest/home",
               is_deleted: 0,
               is_locked: 0
            }
         ],
         {}
      );
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("roles", null, {});
   },
};
