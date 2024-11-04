"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      // Lấy article_type_id từ bảng article_types
      const articleTypes = await queryInterface.sequelize.query(`SELECT article_type_id FROM article_types LIMIT 5;`);
      const typeRows = articleTypes[0];

      // Lấy employee_id từ bảng employees
      const employees = await queryInterface.sequelize.query(
         `SELECT employee_id FROM employees WHERE employee_position = 'Nhân viên content' LIMIT 5;`
      );
      const employeeRows = employees[0];

      return queryInterface.bulkInsert(
         "articles",
         [
            {
               article_title: "Top 10 tuyến đường được yêu thích nhất 2024",
               article_description:
                  "Khám phá những tuyến đường được hành khách đánh giá cao nhất trong năm 2024, từ chất lượng dịch vụ đến cảnh quan tuyệt đẹp.",
               article_content:
                  "Trong năm 2024, chúng tôi đã thống kê và phân tích dữ liệu từ hơn 100,000 lượt đánh giá của khách hàng...",
               article_slug: "top-10-tuyen-duong-yeu-thich-2024",
               published_at: new Date(),
               is_priority: 1,
               article_type_id: typeRows[0].article_type_id,
               employee_id: employeeRows[0].employee_id,
               thumbnail_img: "https://storage.googleapis.com/vex-config/cms-tool/post/img/top-10-routes-2024.jpg",
               article_status: "published",
               view_count: 1520,
            },
            {
               article_title: "Hướng dẫn đặt vé xe Tết 2024 nhanh chóng và tiện lợi",
               article_description:
                  "Tổng hợp các thông tin cần thiết và hướng dẫn chi tiết cách đặt vé xe Tết an toàn, tiết kiệm thời gian.",
               article_content:
                  "Để chuẩn bị cho mùa Tết 2024, chúng tôi xin chia sẻ những kinh nghiệm và mẹo hữu ích...",
               article_slug: "huong-dan-dat-ve-xe-tet-2024",
               published_at: new Date(),
               is_priority: 1,
               article_type_id: typeRows[1].article_type_id,
               employee_id: employeeRows[1].employee_id,
               thumbnail_img: "https://storage.googleapis.com/vex-config/cms-tool/post/img/tet-booking-guide.jpg",
               article_status: "published",
               view_count: 2340,
            },
            {
               article_title: "Ra mắt dịch vụ xe limousine cao cấp tuyến Sài Gòn - Đà Lạt",
               article_description:
                  "Trải nghiệm đẳng cấp mới với dịch vụ xe limousine sang trọng, tiện nghi trên tuyến Sài Gòn - Đà Lạt.",
               article_content: "Nhằm nâng cao chất lượng dịch vụ và đáp ứng nhu cầu ngày càng cao của khách hàng...",
               article_slug: "ra-mat-xe-limousine-saigon-dalat",
               published_at: new Date(),
               is_priority: 1,
               article_type_id: typeRows[2].article_type_id,
               employee_id: employeeRows[2].employee_id,
               thumbnail_img: "https://storage.googleapis.com/vex-config/cms-tool/post/img/limousine-launch.jpg",
               article_status: "published",
               view_count: 1890,
            },
            {
               article_title: "Chương trình khuyến mãi đặc biệt cho sinh viên",
               article_description: "Ưu đãi giảm giá 20% cho sinh viên trên tất cả các tuyến đường trong tháng 9/2024.",
               article_content: "Nhân dịp khai giảng năm học mới, chúng tôi triển khai chương trình ưu đãi đặc biệt...",
               article_slug: "khuyen-mai-sinh-vien-thang-9",
               published_at: new Date(),
               is_priority: 0,
               article_type_id: typeRows[3].article_type_id,
               employee_id: employeeRows[3].employee_id,
               thumbnail_img: "https://storage.googleapis.com/vex-config/cms-tool/post/img/student-promo.jpg",
               article_status: "published",
               view_count: 1230,
            },
            {
               article_title: "Cập nhật lịch trình mới tuyến Hà Nội - Sapa",
               article_description:
                  "Thông báo về việc điều chỉnh lịch trình và bổ sung chuyến mới tuyến Hà Nội - Sapa từ tháng 10/2024.",
               article_content: "Để phục vụ nhu cầu đi lại ngày càng tăng của hành khách, chúng tôi thông báo...",
               article_slug: "cap-nhat-lich-trinh-hanoi-sapa",
               published_at: new Date(),
               is_priority: 1,
               article_type_id: typeRows[4].article_type_id,
               employee_id: employeeRows[4].employee_id,
               thumbnail_img: "https://storage.googleapis.com/vex-config/cms-tool/post/img/hanoi-sapa-schedule.jpg",
               article_status: "published",
               view_count: 980,
            },
         ],
         {}
      );
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("articles", null, {});
   },
};
