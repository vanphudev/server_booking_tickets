"use strict";

const bcrypt = require("bcrypt");

module.exports = {
   up: async (queryInterface, Sequelize) => {
      // Lấy customer_type_id từ bảng customer_types
      const customerTypes = await queryInterface.sequelize.query(`SELECT customer_type_id FROM customer_types;`);
      const typeRows = customerTypes[0];

      const hashedPassword = await bcrypt.hash("123456", 10);

      return queryInterface.bulkInsert(
         "customers",
         [
            {
               customer_full_name: "Nguyễn Văn Phú",
               customer_phone: "0886704541",
               customer_email: "vanphu@example.com",
               customer_gender: 1,
               customer_birthday: "2003-01-01",
               customer_avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=vanphu",
               customer_destination_address: JSON.stringify({
                  province: "Thành phố Hồ Chí Minh",
                  district: "Quận 1",
                  ward: "Phường Bến Nghé",
                  street: "123 Nguyễn Huệ",
               }),
               customer_password: hashedPassword,
               customer_type_id: typeRows[0].customer_type_id,
            },
            {
               customer_full_name: "Phạm Thị Thanh Thúy",
               customer_phone: "0886704542",
               customer_email: "thanhthuy96@example.com",
               customer_gender: 0,
               customer_birthday: "1996-05-15",
               customer_avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=thuy",
               customer_destination_address: JSON.stringify({
                  province: "Thành phố Hồ Chí Minh",
                  district: "Quận 12",
                  ward: "Phường Tân Hưng Thuận",
                  street: "45 Lê Văn Khương",
               }),
               customer_password: hashedPassword,
               customer_type_id: typeRows[1].customer_type_id,
            },
            {
               customer_full_name: "Lê Minh Anh",
               customer_phone: "0886704543",
               customer_email: "minhanh@example.com",
               customer_gender: 0,
               customer_birthday: "1998-08-20",
               customer_avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=anh",
               customer_destination_address: JSON.stringify({
                  province: "Thành phố Hồ Chí Minh",
                  district: "Quận Tân Bình",
                  ward: "Phường 15",
                  street: "78 Cộng Hòa",
               }),
               customer_password: hashedPassword,
               customer_type_id: typeRows[2].customer_type_id,
            },
            {
               customer_full_name: "Trần Hoàng Khoa",
               customer_phone: "0886704544",
               customer_email: "hoangkhoa@example.com",
               customer_gender: 1,
               customer_birthday: "2000-03-25",
               customer_avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=khoa",
               customer_destination_address: JSON.stringify({
                  province: "Thành phố Hồ Chí Minh",
                  district: "Quận Tân Phú",
                  ward: "Phường Tân Quý",
                  street: "156 Lũy Bán Bích",
               }),
               customer_password: hashedPassword,
               customer_type_id: typeRows[3].customer_type_id,
            },
            {
               customer_full_name: "Nguyễn Thị Mai",
               customer_phone: "0886704545",
               customer_email: "nguyenmai@example.com",
               customer_gender: 0,
               customer_birthday: "1995-12-10",
               customer_avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=mai",
               customer_destination_address: JSON.stringify({
                  province: "Thành phố Hồ Chí Minh",
                  district: "Quận Bình Thạnh",
                  ward: "Phường 11",
                  street: "234 Xô Viết Nghệ Tĩnh",
               }),
               customer_password: hashedPassword,
               customer_type_id: typeRows[4].customer_type_id,
            },
         ],
         {}
      );
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("customers", null, {});
   },
};
