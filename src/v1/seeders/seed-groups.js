"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert(
         "groups",
         [
            {
               group_name: "Admin",
               group_description: "Quyền truy cập toàn bộ hệ thống và quản trị người dùng",
               is_deleted: 0,
               is_locked: 0
            },
            {
               group_name: "Editor",
               group_description: "Quản lý và chỉnh sửa nội dung, không có quyền quản trị hệ thống",
               is_deleted: 0,
               is_locked: 0
            },
            {
               group_name: "Moderator",
               group_description: "Kiểm duyệt nội dung và bình luận, không có quyền chỉnh sửa nội dung",
               is_deleted: 0,
               is_locked: 0
            },
            {
               group_name: "Registered User",
               group_description: "Người dùng đã đăng ký với quyền xem và tương tác nội dung",
               is_deleted: 0,
               is_locked: 0
            },
            {
               group_name: "Guest",
               group_description: "Khách truy cập với quyền hạn chế, chỉ có thể xem nội dung công khai",
               is_deleted: 0,
               is_locked: 0
            }
         ],
         {}
      );
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("groups", null, {});
   },
};
