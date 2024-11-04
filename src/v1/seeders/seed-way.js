"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert(
         "ways",
         [
            // Tuyến Sài Gòn - Đà Lạt
            {
               way_name: "SG-DL Quốc lộ 20",
               way_description:
                  "Lộ trình qua Quốc lộ 20: Sài Gòn - Dầu Giây - Bảo Lộc - Đà Lạt. Dừng chân tại Dầu Giây và Bảo Lộc.",
               is_locked: 0,
            },
            {
               way_name: "SG-DL Cao tốc",
               way_description:
                  "Lộ trình cao tốc: Sài Gòn - Dầu Giây - Liên Khương - Đà Lạt. Nhanh hơn 1 giờ so với Quốc lộ 20.",
               is_locked: 0,
            },

            // Tuyến Sài Gòn - Nha Trang
            {
               way_name: "SG-NT Quốc lộ 1A",
               way_description:
                  "Lộ trình Quốc lộ 1A: Sài Gòn - Phan Thiết - Cam Ranh - Nha Trang. Dừng nghỉ tại Phan Thiết.",
               is_locked: 0,
            },
            {
               way_name: "SG-NT Cao tốc",
               way_description:
                  "Lộ trình cao tốc: Sài Gòn - Long Thành - Phan Thiết - Nha Trang. Tiết kiệm 2 giờ di chuyển.",
               is_locked: 0,
            },

            // Tuyến Sài Gòn - Cần Thơ
            {
               way_name: "SG-CT Cao tốc Trung Lương",
               way_description:
                  "Lộ trình cao tốc: Sài Gòn - Trung Lương - Mỹ Thuận - Cần Thơ. Nhanh chóng và thuận tiện.",
               is_locked: 0,
            },
            {
               way_name: "SG-CT Quốc lộ 1A",
               way_description:
                  "Lộ trình Quốc lộ 1A: Sài Gòn - Tiền Giang - Vĩnh Long - Cần Thơ. Dừng chân tại Mỹ Tho.",
               is_locked: 0,
            },

            // Tuyến Sài Gòn - Đà Nẵng
            {
               way_name: "SG-DN Quốc lộ 1A",
               way_description:
                  "Lộ trình xuyên Việt: Sài Gòn - Nha Trang - Quy Nhơn - Đà Nẵng. Dừng nghỉ tại các thành phố lớn.",
               is_locked: 0,
            },
            {
               way_name: "SG-DN Tây Nguyên",
               way_description:
                  "Lộ trình Tây Nguyên: Sài Gòn - Đà Lạt - Buôn Ma Thuột - Pleiku - Đà Nẵng. Cảnh đẹp cao nguyên.",
               is_locked: 0,
            },

            // Tuyến Sài Gòn - Vũng Tàu
            {
               way_name: "SG-VT Cao tốc",
               way_description: "Lộ trình cao tốc: Sài Gòn - Long Thành - Vũng Tàu. Di chuyển nhanh chóng trong 2 giờ.",
               is_locked: 0,
            },
            {
               way_name: "SG-VT Quốc lộ 51",
               way_description:
                  "Lộ trình Quốc lộ 51: Sài Gòn - Biên Hòa - Bà Rịa - Vũng Tàu. Phù hợp ghé thăm điểm du lịch.",
               is_locked: 0,
            },
         ],
         {}
      );
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("ways", null, {});
   },
};
