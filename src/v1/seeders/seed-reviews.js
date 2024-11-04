"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      // Lấy route_id từ bảng routes
      const routes = await queryInterface.sequelize.query(`SELECT route_id FROM routes LIMIT 30;`);
      const routeRows = routes[0];

      // Lấy customer_id từ bảng customers
      const customers = await queryInterface.sequelize.query(`SELECT customer_id FROM customers LIMIT 30;`);
      const customerRows = customers[0];

      return queryInterface.bulkInsert(
         "reviews",
         [
            {
               review_rating: "5",
               review_comment:
                  "Xe limousine rất sang trọng và thoải mái. Ghế rộng rãi, sạch sẽ. Tài xế lái xe an toàn, nhân viên phục vụ chu đáo. Chắc chắn sẽ ủng hộ công ty lần sau.",
               route_id: routeRows[0].route_id,
               customer_id: customerRows[0].customer_id,
            },
            {
               review_rating: "4",
               review_comment:
                  "Dịch vụ tốt, xe giường nằm thoải mái. Chỉ có điều điều hòa hơi lạnh. Nhân viên nhiệt tình hỗ trợ điều chỉnh. Sẽ tiếp tục ủng hộ.",
               route_id: routeRows[1].route_id,
               customer_id: customerRows[1].customer_id,
            },
            {
               review_rating: "5",
               review_comment:
                  "Chuyến xe đúng giờ, nhân viên thân thiện. Đặc biệt ấn tượng với dịch vụ đưa đón tận nơi, rất tiện lợi cho người đi xa. Giá cả hợp lý.",
               route_id: routeRows[2].route_id,
               customer_id: customerRows[2].customer_id,
            },
            {
               review_rating: "3",
               review_comment:
                  "Xe khá ok, sạch sẽ. Tuy nhiên wifi hơi yếu và thời gian dừng nghỉ hơi lâu. Mong công ty cải thiện thêm.",
               route_id: routeRows[3].route_id,
               customer_id: customerRows[3].customer_id,
            },
            {
               review_rating: "4",
               review_comment:
                  "Ấn tượng với thái độ phục vụ chuyên nghiệp của nhân viên. Xe mới và sạch sẽ. Chỉ có điều giá vé hơi cao so với các nhà xe khác.",
               route_id: routeRows[4].route_id,
               customer_id: customerRows[4].customer_id,
            },
            {
               review_rating: "5",
               review_comment:
                  "Lần đầu đi xe của hãng nhưng rất hài lòng. Đặt vé dễ dàng qua app, nhân viên tư vấn nhiệt tình, xe đúng giờ. Tuyệt vời!",
               route_id: routeRows[0].route_id,
               customer_id: customerRows[1].customer_id,
            },
         ],
         {}
      );
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("reviews", null, {});
   },
};
