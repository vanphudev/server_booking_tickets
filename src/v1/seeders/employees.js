"use strict";

const bcrypt = require('bcrypt');

module.exports = {
   up: async (queryInterface, Sequelize) => {
      // Lấy office_id và employee_type_id
      const offices = await queryInterface.sequelize.query(
         `SELECT office_id FROM offices LIMIT 10;`
      );
      const officeRows = offices[0];

      const employeeTypes = await queryInterface.sequelize.query(
         `SELECT employee_type_id FROM employee_types LIMIT 10;`
      );
      const typeRows = employeeTypes[0];

      // Hash password
      const hashedPassword = await bcrypt.hash('123456', 10);

      return queryInterface.bulkInsert(
         "employees",
         [
            {
                employee_full_name: "Nguyễn Văn An", 
                employee_email: "vannguyen.an@example.com", 
                employee_phone: "0886704551",
                employee_username: "nguyenan",
                employee_birthday: "1990-01-01",
                employee_password: hashedPassword,
                employee_profile_image: "https://api.dicebear.com/7.x/avataaars/svg?seed=an",
                employee_gender: 1,
                employee_position: "Tài xế",
                employee_address: JSON.stringify({
                    province: "Thành phố Hồ Chí Minh",
                    district: "Quận 1",
                    ward: "Phường Bến Nghé",
                    street: "123 Nguyễn Huệ"
                }),
                office_id: officeRows[0].office_id,
                employee_type_id: typeRows[0].employee_type_id,
            },
            {
                employee_full_name: "Trần Thị Bình", 
                employee_email: "binh.tran@example.com", 
                employee_phone: "0886704552",
                employee_username: "tranbinh",
                employee_birthday: "1995-05-15",
                employee_password: hashedPassword,
                employee_profile_image: "https://api.dicebear.com/7.x/avataaars/svg?seed=binh",
                employee_gender: 0,
                employee_position: "Nhân viên bán vé",
                employee_address: JSON.stringify({
                    province: "Thành phố Hồ Chí Minh",
                    district: "Quận 3",
                    ward: "Phường 1",
                    street: "45 Võ Văn Tần"
                }),
                office_id: officeRows[1].office_id,
                employee_type_id: typeRows[1].employee_type_id,
            },
            {
                employee_full_name: "Lê Văn Cường", 
                employee_email: "cuong.le@example.com", 
                employee_phone: "0886704553",
                employee_username: "lecuong",
                employee_birthday: "1988-08-20",
                employee_password: hashedPassword,
                employee_profile_image: "https://api.dicebear.com/7.x/avataaars/svg?seed=cuong",
                employee_gender: 1,
                employee_position: "Tài xế",
                employee_address: JSON.stringify({
                    province: "Thành phố Hồ Chí Minh",
                    district: "Quận Bình Thạnh",
                    ward: "Phường 11",
                    street: "78 Điện Biên Phủ"
                }),
                office_id: officeRows[2].office_id,
                employee_type_id: typeRows[2].employee_type_id,
            },
            {
                employee_full_name: "Phạm Thị Dung", 
                employee_email: "dung.pham@example.com", 
                employee_phone: "0886704554",
                employee_username: "phamdung",
                employee_birthday: "1992-12-30",
                employee_password: hashedPassword,
                employee_profile_image: "https://api.dicebear.com/7.x/avataaars/svg?seed=dung",
                employee_gender: 0,
                employee_position: "Quản lý",
                employee_address: JSON.stringify({
                    province: "Thành phố Hồ Chí Minh",
                    district: "Quận Phú Nhuận",
                    ward: "Phường 15",
                    street: "234 Phan Xích Long"
                }),
                office_id: officeRows[3].office_id,
                employee_type_id: typeRows[3].employee_type_id,
            },
            {
                employee_full_name: "Hoàng Văn Em", 
                employee_email: "em.hoang@example.com", 
                employee_phone: "0886704555",
                employee_username: "hoanem",
                employee_birthday: "1985-11-11",
                employee_password: hashedPassword,
                employee_profile_image: "https://api.dicebear.com/7.x/avataaars/svg?seed=em",
                employee_gender: 1,
                employee_position: "Tài xế",
                employee_address: JSON.stringify({
                    province: "Thành phố Hồ Chí Minh",
                    district: "Quận Tân Bình",
                    ward: "Phường 12",
                    street: "56 Cộng Hòa"
                }),
                office_id: officeRows[4].office_id,
                employee_type_id: typeRows[4].employee_type_id,
            }
         ],
         {}
      );
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("employees", null, {});
   },
};