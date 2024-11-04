-- Tạo DB
CREATE DATABASE online_tickets_booking_phuongtrang CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Dùng DB
USE online_tickets_booking_phuongtrang;

-- Bảng customer_types (Loại khách hàng):
CREATE TABLE customer_types (
    customer_type_id INT AUTO_INCREMENT PRIMARY KEY, -- ID duy nhất cho mỗi loại khách hàng, tự động tăng.
    customer_type_name VARCHAR(255) UNIQUE, -- Tên loại khách hàng (ví dụ: Thường, Vãn Lai, VIP).
    customer_type_description VARCHAR(500), -- Mô tả liên quan đến loại khách hàng này.
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo loại khách hàng.
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Thời gian cập nhật thông tin gần nhất, tự động cập nhật khi có thay đổi.
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng customers (Khách hàng):
CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY, -- ID duy nhất của khách hàng, tự động tăng.
    customer_full_name VARCHAR(255), -- Tên đầy đủ của khách hàng.
    customer_phone VARCHAR(20) UNIQUE, -- Số điện thoại của khách hàng, phải là duy nhất.
    customer_email VARCHAR(500) UNIQUE, -- Địa chỉ email của khách hàng, phải là duy nhất.
    customer_gender TINYINT(1) CHECK (customer_gender IN (0, 1, -1)), -- Giới tính của khách hàng (1: Nam, 0: Nữ, -1: Khác).
    customer_birthday DATE CHECK (customer_birthday BETWEEN '1900-01-01' AND '2100-12-31'), -- Ngày sinh của khách hàng (dạng YYYY-MM-DD).
    customer_avatar_url TEXT, -- Đường dẫn URL tới ảnh đại diện của khách hàng.
    customer_destination_address JSON DEFAULT '{"province": "value_province", "district": "value_district", "wards": "value_wards"}', -- Địa chỉ lưu bằng JSON {"province": "value1", "district": "value2", "wards": "value3"} EX: '{"province": "TP HCM", "district": "Quận 1", "wards": "Bến Nghé"}'.
    customer_password VARCHAR(500), -- Mật khẩu của khách hàng (nên được mã hóa trước khi lưu).
    is_disabled TINYINT(1) DEFAULT 0 CHECK (is_disabled IN (0, 1)), -- Trạng thái khóa tài khoản của khách hàng (1: Bị khóa, 0: Không bị khóa).
    last_login_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Thời gian đăng nhập gần nhất của khách hàng, tự động cập nhật khi có thay đổi.
    access_token TEXT, -- Token truy cập của khách hàng (dùng để xác thực phiên đăng nhập).
    refresh_token TEXT, -- Token làm mới của khách hàng.
    last_refresh_token TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Thời gian cập nhật token làm mới gần nhất.
    is_deleted TINYINT(1) DEFAULT 0 CHECK (is_deleted IN (0, 1)), -- Trạng thái xóa của khách hàng (1: Đã xóa, 0: Chưa xóa).
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo tài khoản khách hàng, mặc định là thời gian hiện tại khi tạo.
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Thời gian cập nhật thông tin gần nhất, tự động cập nhật khi có thay đổi.
    customer_type_id INT, -- ID loại khách hàng (liên kết với bảng customer_types).
    CONSTRAINT fk_customers_customer_type FOREIGN KEY (customer_type_id) REFERENCES customer_types(customer_type_id) -- Khóa ngoại liên kết đến customer_types.
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng provinces (Tỉnh thành):
CREATE TABLE provinces (
    province_id VARCHAR(50) PRIMARY KEY, -- ID duy nhất cho mỗi tỉnh thành, tự động tăng.
    province_name VARCHAR(255) NOT NULL UNIQUE, -- Tên của tỉnh/thành phố.
    province_grade VARCHAR(255), -- Cấp hành chính của tỉnh (ví dụ: Tỉnh, Thành phố trực thuộc trung ương).
    province_description VARCHAR(500), -- Mô tả thêm về tỉnh thành này (nếu cần).
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo bản ghi, mặc định là thời gian hiện tại khi tạo.
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Thời gian cập nhật bản ghi, tự động cập nhật khi có thay đổi.
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng districts (Huyện/Thị xã/Quận):
CREATE TABLE districts (
    district_id VARCHAR(50) PRIMARY KEY, -- ID duy nhất cho mỗi huyện/thị xã/quận, tự động tăng.
    district_name VARCHAR(255), -- Tên của huyện/thị xã/quận.
    district_description VARCHAR(500), -- Mô tả thêm về huyện/thị xã/quận này (nếu cần).
    district_grade VARCHAR(255), -- Cấp hành chính của huyện/thị xã/quận.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo bản ghi, mặc định là thời gian hiện tại khi tạo.
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Thời gian cập nhật bản ghi, tự động cập nhật khi có thay đổi.
    province_id VARCHAR(50), -- Khóa ngoại liên kết tới bảng provinces, chỉ định huyện/thị xã/quận thuộc tỉnh nào.
    CONSTRAINT fk_districts_provinces FOREIGN KEY (province_id) REFERENCES provinces(province_id) -- Khóa ngoại liên kết đến bảng provinces.
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng wards (Xã/Phường):
CREATE TABLE wards (
    ward_id VARCHAR(50) PRIMARY KEY, -- ID duy nhất cho mỗi xã, tự động tăng.
    ward_name VARCHAR(255), -- Tên của xã.
    ward_description VARCHAR(255), -- Mô tả thêm về xã (nếu cần).
    ward_grade VARCHAR(500), -- Cấp hành chính của xã.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo bản ghi, mặc định là thời gian hiện tại khi tạo.
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Thời gian cập nhật bản ghi, tự động cập nhật khi có thay đổi.
    district_id VARCHAR(50), -- Khóa ngoại liên kết tới bảng districts, chỉ định xã thuộc huyện nào.
    CONSTRAINT fk_wards_districts FOREIGN KEY (district_id) REFERENCES districts(district_id) -- Khóa ngoại liên kết đến bảng districts.
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng offices (Bến xe/Văn phòng):
CREATE TABLE offices (
    office_id INT AUTO_INCREMENT PRIMARY KEY, -- ID duy nhất cho mỗi văn phòng/bến xe, tự động tăng.
    office_name VARCHAR(500) NOT NULL, -- Tên văn phòng/bến xe, không được để trống.
    office_address TEXT, -- Địa chỉ của văn phòng/bến xe.
    office_phone VARCHAR(20) UNIQUE, -- Số điện thoại liên hệ của văn phòng/bến xe, phải là duy nhất.
    office_fax VARCHAR(20), -- Số fax của văn phòng/bến xe.
    office_description TEXT, -- Mô tả chi tiết văn phòng/bến xe.
    office_latitude TEXT, -- Vĩ độ của văn phòng/bến xe (tọa độ trên bản đồ).
    office_longitude TEXT, -- Kinh độ của văn phòng/bến xe (tọa độ trên bản đồ).
    office_map_url TEXT, -- URL của bản đồ vị trí văn phòng/bến xe.
    is_locked TINYINT(1) DEFAULT 0 CHECK (is_locked IN (0, 1)), -- Trạng thái khóa văn phòng (1: Bị khóa, 0: Hoạt động).
    last_lock_at TIMESTAMP NULL, -- Thời gian cuối cùng văn phòng bị khóa (NULL nếu chưa bị khóa).
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo bản ghi.
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Thời gian cập nhật bản ghi.
    ward_id VARCHAR(50), -- Khóa ngoại liên kết tới bảng wards (Xã/Phường).
    CONSTRAINT fk_offices_wards FOREIGN KEY (ward_id) REFERENCES wards(ward_id) -- Khóa ngoại liên kết đến bảng wards.
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng office_images (Hình ảnh của Bến xe/Văn phòng):
CREATE TABLE office_images (
    office_image_id INT AUTO_INCREMENT PRIMARY KEY, -- ID duy nhất cho mỗi hình ảnh, tự động tăng.
    office_image_url TEXT, -- URL hoặc đường dẫn của hình ảnh.
    office_image_description VARCHAR(255), -- Mô tả chi tiết về hình ảnh (tùy chọn).
		office_image_type VARCHAR(50), -- Kiểu file ảnh (jpg, png, gif,...)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo bản ghi.
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Thời gian cập nhật bản ghi.
    office_id INT, -- Khóa ngoại liên kết với bảng offices (Văn phòng/Bến xe).
    CONSTRAINT fk_office_images_offices FOREIGN KEY (office_id) REFERENCES offices(office_id) -- Khóa ngoại liên kết đến bảng offices.
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng map_vehicle_layouts (Sơ đồ xe):
CREATE TABLE map_vehicle_layouts (
    map_vehicle_layout_id INT AUTO_INCREMENT PRIMARY KEY, -- ID duy nhất cho mỗi sơ đồ, tự động tăng.
    layout_name VARCHAR(255) NOT NULL, -- Tên sơ đồ (ví dụ: Sơ đồ A, Sơ đồ B).
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo bản ghi.
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Thời gian cập nhật bản ghi.
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng map_vehicle_seats (Ghế xe):
CREATE TABLE map_vehicle_seats (
    map_vehicle_seat_id INT AUTO_INCREMENT PRIMARY KEY, -- ID duy nhất cho mỗi ghế, tự động tăng.
    map_vehicle_seat_code VARCHAR(255) NOT NULL UNIQUE, -- Mã ghế (ví dụ: A11), không được để trống và phải là duy nhất.
    map_vehicle_seat_row_no INT NOT NULL CHECK (map_vehicle_seat_row_no > 0), -- Số hàng của ghế, phải lớn hơn 0.
    map_vehicle_seat_column_no INT NOT NULL CHECK (map_vehicle_seat_column_no > 0), -- Số cột của ghế, phải lớn hơn 0.
    map_vehicle_seat_floor_no INT NOT NULL CHECK (map_vehicle_seat_floor_no >= 0), -- Số tầng của xe, không âm.
    map_vehicle_seat_lock_chair TINYINT(1) DEFAULT 0 CHECK (map_vehicle_seat_lock_chair IN (0, 1)), -- Trạng thái khóa ghế.
    map_vehicle_layout_id INT, -- Khóa ngoại liên kết với bảng map_vehicle_layouts (sơ đồ ghế).
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo bản ghi.
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Thời gian cập nhật bản ghi.
    CONSTRAINT fk_map_vehicle_seats_layouts FOREIGN KEY (map_vehicle_layout_id) REFERENCES map_vehicle_layouts(map_vehicle_layout_id) -- Khóa ngoại liên kết với bảng map_vehicle_layouts.
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng vehicle_types (Loại xe):
CREATE TABLE vehicle_types (
    vehicle_type_id INT AUTO_INCREMENT PRIMARY KEY, -- ID duy nhất cho mỗi loại xe, tự động tăng.
    vehicle_type_name VARCHAR(255) NOT NULL UNIQUE, -- Tên loại xe (Ví dụ: Xe khách, Xe buýt, Xe giường nằm), duy nhất.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo bản ghi.
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Thời gian cập nhật bản ghi.
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng vehicles (Xe):
CREATE TABLE vehicles (
    vehicle_id INT AUTO_INCREMENT PRIMARY KEY, -- ID duy nhất cho mỗi xe, tự động tăng.
    vehicle_license_plate VARCHAR(255) NOT NULL UNIQUE, -- Biển số xe, không được để trống và phải là duy nhất.
    vehicle_model VARCHAR(255), -- Model của xe (ví dụ: Sedona, Transit).
    vehicle_brand VARCHAR(255), -- Hãng xe (ví dụ: Ford, Toyota).
    vehicle_capacity INT NOT NULL CHECK (vehicle_capacity > 0), -- Số lượng chỗ ngồi của xe, phải lớn hơn 0.
    vehicle_manufacture_year INT CHECK (vehicle_manufacture_year >= 1800), -- Năm sản xuất của xe, từ năm 1800 đến năm hiện tại.
    vehicle_color VARCHAR(255), -- Màu sắc của xe.
    vehicle_description VARCHAR(500), -- Mô tả hoặc ghi chú thêm về xe.
    is_locked TINYINT(1) DEFAULT 0 CHECK (is_locked IN (0, 1)), -- Trạng thái khóa xe (1 là bị khóa, 0 là không khóa).
    last_lock_at TIMESTAMP NULL, -- Thời gian cuối cùng xe bị khóa (NULL nếu chưa bị khóa).
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo bản ghi.
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Thời gian cập nhật bản ghi.
    map_vehicle_layout_id INT, -- Khóa ngoại liên kết với bảng map_vehicle_layouts (Layouts - Sơ đồ Ghế của xe).
    office_id INT, -- Khóa ngoại liên kết với bảng offices (Văn phòng/Bến xe quản lý xe).
    vehicle_type_id INT, -- Khóa ngoại liên kết với bảng vehicle_types (Loại xe).
    CONSTRAINT fk_vehicles_offices FOREIGN KEY (office_id) REFERENCES offices(office_id), -- Khóa ngoại liên kết với bảng offices.
    CONSTRAINT fk_vehicles_vehicle_types FOREIGN KEY (vehicle_type_id) REFERENCES vehicle_types(vehicle_type_id), -- Khóa ngoại liên kết với bảng vehicle_types.
    CONSTRAINT fk_vehicles_map_vehicle_layouts FOREIGN KEY (map_vehicle_layout_id) REFERENCES map_vehicle_layouts(map_vehicle_layout_id) -- Khóa ngoại liên kết với bảng map_vehicle_layouts.
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng vehicle_images (Hình ảnh mô tả của xe):
CREATE TABLE vehicle_images (
    vehicle_image_id INT AUTO_INCREMENT PRIMARY KEY, -- ID duy nhất cho mỗi hình ảnh, tự động tăng.
    vehicle_image_url TEXT, -- Đường dẫn hoặc URL của hình ảnh.
    vehicle_image_description VARCHAR(500), -- Mô tả hình ảnh (tùy chọn).
		vehicle_image_type VARCHAR(50), -- Kiểu file ảnh (jpg, png, gif,...)
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo bản ghi.
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Thời gian cập nhật bản ghi.
    vehicle_id INT, -- Khóa ngoại liên kết với bảng vehicles.
    CONSTRAINT fk_vehicle_images_vehicles FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id) -- Khóa ngoại liên kết đến bảng vehicles.
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng ways (Lộ trình chi tiết):
CREATE TABLE ways (
    way_id INT AUTO_INCREMENT PRIMARY KEY, -- ID duy nhất cho mỗi lộ trình chi tiết, tự động tăng.
    way_name VARCHAR(255) NOT NULL, -- Tên lộ trình chi tiết, không được để trống.
    way_description VARCHAR(500), -- Ghi chú hoặc mô tả thêm về lộ trình.
    is_locked TINYINT(1) DEFAULT 0 CHECK (is_locked IN (0, 1)), -- Trạng thái khóa (1 là khóa, 0 là mở), mặc định là không khóa.
    last_lock_at TIMESTAMP NULL, -- Thời gian cuối cùng lộ trình bị khóa (NULL nếu chưa bị khóa).
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo bản ghi.
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Thời gian cập nhật bản ghi.
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng routes (Tuyến xe):
CREATE TABLE routes (
    route_id INT AUTO_INCREMENT PRIMARY KEY, -- ID duy nhất cho mỗi tuyến xe, tự động tăng.
    route_name VARCHAR(500) NOT NULL, -- Tên tuyến đường, không được để trống.
    route_duration BIGINT CHECK (route_duration >= 0), -- Thời gian Tuyến xe tính bằng phút, không được âm.
    route_distance BIGINT CHECK (route_distance >= 0), -- Khoảng cách tuyến xe tính bằng km, không được âm.
    route_url_gps TEXT, -- Đường dẫn GPS (ví dụ: link Google Maps).
    origin_office_id INT, -- Văn phòng khởi hành, liên kết với bảng offices.
    destination_office_id INT, -- Văn phòng đích đến, liên kết với bảng offices.
    route_price DECIMAL(10, 2) DEFAULT 0.00 CHECK (route_price >= 0), -- Giá vé mặc định, không được âm.
    is_default TINYINT(1) DEFAULT 0 CHECK (is_default IN (0, 1)), -- Trạng thái tuyến xe cố định (0 là không cố định).
    is_locked TINYINT(1) DEFAULT 0 CHECK (is_locked IN (0, 1)), -- Trạng thái khóa tuyến xe.
    last_lock_at TIMESTAMP NULL, -- Thời gian khóa tuyến xe gần nhất.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo bản ghi.
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Thời gian cập nhật bản ghi.
    way_id INT, -- Khóa ngoại liên kết với bảng ways (lộ trình chi tiết).
    CONSTRAINT fk_routes_ways FOREIGN KEY (way_id) REFERENCES ways(way_id), -- Khóa ngoại liên kết với bảng ways.
    CONSTRAINT fk_routes_offices_origin FOREIGN KEY (origin_office_id) REFERENCES offices(office_id), -- Khóa ngoại liên kết với bảng offices (văn phòng khởi hành).
    CONSTRAINT fk_routes_offices_destination FOREIGN KEY (destination_office_id) REFERENCES offices(office_id) -- Khóa ngoại liên kết với bảng offices (văn phòng đích).
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng pickup_points (Điểm đón):
CREATE TABLE pickup_points (
    pickup_point_way_id INT NOT NULL, -- ID lộ trình chi tiết, liên kết với bảng ways.
    pickup_point_office_id INT NOT NULL, -- ID văn phòng, liên kết với bảng offices, không được để trống.
    pickup_point_name VARCHAR(500) NOT NULL, -- Tên điểm đón, không được để trống.
    pickup_point_time BIGINT CHECK (pickup_point_time >= 0), -- Thời gian đón (so với giờ khởi hành, tính bằng phút), không được âm.
    pickup_point_kind TINYINT(1) CHECK (pickup_point_kind IN (0, 1)), -- Loại điểm đón (0 là dọc đường, 1 là cố định).
    pickup_point_description VARCHAR(500), -- Ghi chú hoặc mô tả thêm về điểm đón.
    point_kind_name VARCHAR(500), -- Tên loại điểm đón (ví dụ: điểm đón cố định, điểm đón dọc đường).
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo bản ghi.
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Thời gian cập nhật bản ghi.
    PRIMARY KEY (pickup_point_office_id, pickup_point_way_id), -- Khóa chính kết hợp (Composite Key).
    CONSTRAINT fk_pickup_points_ways FOREIGN KEY (pickup_point_way_id) REFERENCES ways(way_id), -- Khóa ngoại liên kết với bảng ways.
    CONSTRAINT fk_pickup_points_offices FOREIGN KEY (pickup_point_office_id) REFERENCES offices(office_id) -- Khóa ngoại liên kết với bảng offices.
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng employee_types (Loại nhân viên):
CREATE TABLE employee_types (
    employee_type_id INT AUTO_INCREMENT PRIMARY KEY, -- ID duy nhất cho mỗi loại nhân viên, tự động tăng.
    employee_type_name VARCHAR(255) NOT NULL UNIQUE, -- Tên loại nhân viên (Ví dụ: Quản lý, Nhân viên bán vé, Tài xế, v.v.).
    employee_type_description VARCHAR(500), -- Mô tả thêm cho loại nhân viên.
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo bản ghi.
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Thời gian cập nhật bản ghi.
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng employees (Nhân viên):
CREATE TABLE employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY, -- ID duy nhất cho mỗi nhân viên, tự động tăng.
    employee_full_name VARCHAR(500) NOT NULL, -- Họ và tên của nhân viên, không được để trống.
    employee_email VARCHAR(500) NOT NULL UNIQUE, -- Email nhân viên, không được để trống và phải duy nhất.
    employee_phone VARCHAR(20) NOT NULL UNIQUE, -- Số điện thoại nhân viên, không được để trống.
    employee_username VARCHAR(255) NOT NULL UNIQUE, -- Tên đăng nhập của nhân viên, không được để trống và phải duy nhất.
    employee_birthday DATE CHECK (employee_birthday BETWEEN '1900-01-01' AND '2100-12-31'), -- Ngày sinh của nhân viên (dạng YYYY-MM-DD).
		employee_password VARCHAR(255) NOT NULL, -- Mật khẩu của nhân viên, không được để trống.
    employee_profile_image TEXT, -- Hình ảnh của nhân viên.
    employee_gender TINYINT(1) CHECK (employee_gender IN (0, 1, -1)), -- Giới tính của nhân viên (0 cho nữ, 1 cho nam, -1 cho Khác).
    access_token TEXT, -- Token truy cập.
    refresh_token TEXT, -- Token làm mới phiên.
    last_refresh_token TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian token làm mới gần nhất.
    is_first_activation TINYINT(1) DEFAULT 1 CHECK (is_first_activation IN (0, 1)), -- Trạng thái tài khoản kích hoạt lần đầu (1 là kích hoạt lần đầu, 0 là tài khoản đã qua lần đăng nhập đầu tiên).
    is_locked TINYINT(1) DEFAULT 0 CHECK (is_locked IN (0, 1)), -- Trạng thái khóa tài khoản (0 là không khóa, 1 là khóa).
    last_lock_at TIMESTAMP NULL, -- Thời gian khóa tài khoản gần nhất.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo bản ghi.
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Thời gian cập nhật bản ghi.
    office_id INT, -- Khóa ngoại liên kết với bảng offices.
    employee_type_id INT, -- Khóa ngoại liên kết với bảng employee_types.
    CONSTRAINT fk_employees_employee_types FOREIGN KEY (employee_type_id) REFERENCES employee_types(employee_type_id), -- Liên kết với bảng employee_types.
    CONSTRAINT fk_employees_offices FOREIGN KEY (office_id) REFERENCES offices(office_id) -- Liên kết với bảng offices.
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng drivers (Tài xế):
CREATE TABLE drivers (
    driver_id INT AUTO_INCREMENT PRIMARY KEY, -- ID duy nhất cho mỗi tài xế, tự động tăng.
    driver_license_number VARCHAR(500) NOT NULL, -- Số giấy phép lái xe, không được để trống.
    driver_experience_years INT CHECK (driver_experience_years >= 0), -- Số năm kinh nghiệm lái xe, không được âm.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo bản ghi.
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Thời gian cập nhật bản ghi.
    employee_id INT NOT NULL UNIQUE, -- Khóa ngoại liên kết với bảng employees, không được để trống và phải duy nhất.
    CONSTRAINT fk_drivers_employees FOREIGN KEY (employee_id) REFERENCES employees(employee_id) -- Khóa ngoại liên kết với bảng employees.
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng trips (Chuyến xe):
CREATE TABLE trips (
    trip_id INT AUTO_INCREMENT PRIMARY KEY, -- ID duy nhất cho mỗi chuyến xe, tự động tăng.
    trip_arrival_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Giờ đến, không được để trống.
    trip_departure_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL CHECK (trip_arrival_time > trip_departure_time), -- Giờ khởi hành, không được để trống.
    trip_date DATE DEFAULT CURRENT_DATE, -- Ngày đi, có thể thay đổi theo từng chuyến.
    trip_price DECIMAL(10, 2) DEFAULT 0.00 CHECK (trip_price >= 0), -- Giá vé đã tính VAT và các chi phí có liên quan.
    trip_discount DECIMAL(10, 2) DEFAULT 0.00 CHECK (trip_discount >= 0 AND trip_discount <= trip_price), -- Phần trăm giảm giá cho chuyến xe (nếu có), không được âm và không vượt quá giá vé.
    trip_shuttle_enable TINYINT(1) DEFAULT 0 CHECK (trip_shuttle_enable IN (0, 1)), -- Có hỗ trợ xe trung chuyển hay không? (Mặc định là không).
    allow_online_booking TINYINT(1) DEFAULT 0 CHECK (allow_online_booking IN (0, 1)), -- Được phép đặt vé online hay không? (Mặc định là không).
    trip_holiday TINYINT(1) DEFAULT 0 CHECK (trip_holiday IN (0, 1)), -- Chuyến xe là ngày lễ (Mặc định là không).
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo bản ghi.
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Thời gian cập nhật bản ghi.
    route_id INT, -- Xe thuộc tuyến xe nào (Xác định được văn phòng đến và văn phòng đi).
    vehicle_id INT, -- Xe nào chạy chuyến này.
    CONSTRAINT fk_trips_routes FOREIGN KEY (route_id) REFERENCES routes(route_id), -- Liên kết với bảng routes.
    CONSTRAINT fk_trips_vehicles FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id) -- Liên kết với bảng vehicles.
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng trip_employees (Nhân viên làm việc trên mỗi chuyến xe):
CREATE TABLE trip_employees (
    trip_id INT NOT NULL, -- ID chuyến xe.
    employee_id INT NOT NULL, -- ID nhân viên.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo bản ghi.
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Thời gian cập nhật bản ghi.
    PRIMARY KEY (trip_id, employee_id), -- Khóa chính là sự kết hợp giữa trip_id và employee_id.
    CONSTRAINT fk_trip_employees_trips FOREIGN KEY (trip_id) REFERENCES trips(trip_id), -- Liên kết với bảng trips.
    CONSTRAINT fk_trip_employees_employees FOREIGN KEY (employee_id) REFERENCES employees(employee_id) -- Liên kết với bảng employees.
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng reviews (Đánh giá):
CREATE TABLE reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY, -- ID duy nhất cho mỗi đánh giá, tự động tăng.
    review_rating INT DEFAULT 5 CHECK (review_rating BETWEEN 1 AND 5), -- Số sao đánh giá (1-5 sao).
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian đánh giá.
    review_comment TEXT, -- Nội dung bình luận.
    is_locked TINYINT(1) DEFAULT 0 CHECK (is_locked IN (0, 1)), -- Trạng thái khóa đánh giá (0: không khóa, 1: khóa).
    last_lock_at TIMESTAMP NULL, -- Thời gian khóa đánh giá gần nhất.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo bản ghi.
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Thời gian cập nhật bản ghi.
    route_id INT, -- ID tuyến xe được đánh giá.
    customer_id INT NOT NULL, -- ID khách hàng thực hiện đánh giá.
    CONSTRAINT fk_reviews_customers FOREIGN KEY (customer_id) REFERENCES customers(customer_id), -- Liên kết với bảng customers.
    CONSTRAINT fk_reviews_routes FOREIGN KEY (route_id) REFERENCES routes(route_id) -- Liên kết với bảng routes.
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng review_images (Hình ảnh trong đánh giá):
CREATE TABLE review_images (
    review_image_id INT AUTO_INCREMENT PRIMARY KEY, -- ID duy nhất cho mỗi hình ảnh, tự động tăng.
    review_id INT, -- ID đánh giá mà hình ảnh thuộc về.
    review_image_url TEXT, -- URL của hình ảnh.
	review_image_type VARCHAR(50), -- Kiểu file ảnh (jpg, png, gif,...)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo bản ghi.
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Thời gian cập nhật bản ghi.
    CONSTRAINT fk_review_images_reviews FOREIGN KEY (review_id) REFERENCES reviews(review_id) -- Liên kết với bảng reviews.
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng booking_seats (Chỗ ngồi đặt vé):
CREATE TABLE booking_seats (
    booking_seat_id INT AUTO_INCREMENT PRIMARY KEY, -- ID duy nhất cho mỗi chỗ ngồi đặt vé, tự động tăng.
    trip_id INT NOT NULL, -- ID chuyến xe, không được để trống.
    map_vehicle_seat_id INT NOT NULL, -- ID chỗ ngồi trong xe, không được để trống.
    booking_seat_status TINYINT(1) DEFAULT 0 CHECK (booking_seat_status IN (0, 1)), -- Trạng thái chỗ ngồi (0: chưa đặt, 1: đã đặt).
    booking_expiration_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian hết hạn đặt chỗ.
    is_locked TINYINT(1) DEFAULT 0 CHECK (is_locked IN (0, 1)), -- Trạng thái khóa chỗ ngồi (0: không khóa, 1: đã khóa).
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo bản ghi.
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Thời gian cập nhật bản ghi.
    CONSTRAINT fk_booking_seats_trips FOREIGN KEY (trip_id) REFERENCES trips(trip_id), -- Liên kết với bảng trips.
    CONSTRAINT fk_booking_seats_map_vehicle_seats FOREIGN KEY (map_vehicle_seat_id) REFERENCES map_vehicle_seats(map_vehicle_seat_id) -- Liên kết với bảng map_vehicle_seats.
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng tickets (Vé):
CREATE TABLE tickets (
    ticket_id INT AUTO_INCREMENT PRIMARY KEY, -- ID duy nhất cho mỗi vé, tự động tăng.
    trip_id INT, -- ID chuyến xe, không được để trống.
    booking_seat_id INT, -- ID chỗ ngồi đã đặt, không được để trống.
    ticket_name_chair VARCHAR(255), -- Tên hoặc mô tả chỗ ngồi.
    is_export_ticket TINYINT(1) DEFAULT 0 CHECK (is_export_ticket IN (0, 1)), -- Trạng thái in vé (0: chưa in, 1: đã in).
    ticket_amount DECIMAL(10, 2) NOT NULL CHECK (ticket_amount >= 0), -- Số tiền vé, không được trống và phải lớn hơn 0.
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo bản ghi.
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Thời gian cập nhật bản ghi.
    CONSTRAINT fk_tickets_trips FOREIGN KEY (trip_id) REFERENCES trips(trip_id), -- Liên kết với bảng trips.
    CONSTRAINT fk_tickets_booking_seats FOREIGN KEY (booking_seat_id) REFERENCES booking_seats(booking_seat_id) ON DELETE SET NULL -- Liên kết với bảng booking_seats.
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng payment_types (Loại hình thanh toán):
CREATE TABLE payment_types (
    payment_type_id INT AUTO_INCREMENT PRIMARY KEY, -- ID duy nhất cho mỗi loại hình thanh toán, tự động tăng.
    payment_type_name VARCHAR(255) NOT NULL UNIQUE, -- Tên loại hình thanh toán (ví dụ: Visa, Napas, Ví điện tử).
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo bản ghi.
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Thời gian cập nhật bản ghi.
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng payment_methods (Phương thức thanh toán):
CREATE TABLE payment_methods (
    payment_method_id INT AUTO_INCREMENT PRIMARY KEY, -- ID duy nhất cho mỗi phương thức thanh toán, tự động tăng.
    payment_method_code VARCHAR(255) NOT NULL UNIQUE, -- Mã phương thức thanh toán (ví dụ: VNPAY).
    payment_method_name VARCHAR(255) NOT NULL UNIQUE, -- Tên phương thức thanh toán (ví dụ: Thanh toán qua thẻ tín dụng).
    is_locked TINYINT(1) DEFAULT 0 CHECK (is_locked IN (0, 1)), -- Trạng thái khóa phương thức thanh toán (0: không khóa, 1: khóa), mặc định không khóa.
    last_lock_at TIMESTAMP NULL, -- Thời gian khóa phương thức thanh toán lần cuối, có thể là NULL nếu chưa khóa.
    payment_method_description TEXT, -- Mô tả về phương thức thanh toán.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo bản ghi.
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Thời gian cập nhật bản ghi.
    payment_type_id INT, -- ID loại hình thanh toán.
    CONSTRAINT fk_payment_methods_payment_types FOREIGN KEY (payment_type_id) REFERENCES payment_types(payment_type_id) -- Liên kết với bảng payment_types.
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng payment_configs (Cấu hình thanh toán):
CREATE TABLE payment_configs (
    payment_config_id INT AUTO_INCREMENT PRIMARY KEY, -- ID duy nhất cho mỗi cấu hình thanh toán, tự động tăng.
    api_key TEXT NOT NULL, -- Khóa API cho tích hợp.
    secret_key TEXT NOT NULL, -- Khóa bí mật cho tích hợp.
    public_key TEXT NOT NULL, -- Khóa công khai cho tích hợp.
    payment_endpoint_url TEXT NOT NULL, -- URL điểm cuối thanh toán.
    transaction_timeout INT NOT NULL, -- Thời gian chờ giao dịch (sử dụng INT để dễ dàng tính toán).
    environment VARCHAR(20) NOT NULL CHECK (environment IN ('production', 'develop')), -- Môi trường với ràng buộc kiểm tra giá trị hợp lệ.
    is_deleted TINYINT(1) DEFAULT 0 CHECK (is_deleted IN (0, 1)), -- Trạng thái xóa cấu hình (0: chưa xóa, 1: đã xóa), mặc định là chưa xóa.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo bản ghi.
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Thời gian cập nhật bản ghi.
    payment_method_id INT UNIQUE, -- ID phương thức thanh toán.
    CONSTRAINT fk_payment_configs_payment_methods FOREIGN KEY (payment_method_id) REFERENCES payment_methods(payment_method_id) -- Liên kết với bảng payment_methods.
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng vouchers (Vouchers)
CREATE TABLE vouchers (
    voucher_id INT AUTO_INCREMENT PRIMARY KEY, -- Khóa chính, ID voucher tự động tăng
    voucher_code VARCHAR(255) NOT NULL UNIQUE, -- Mã voucher (ví dụ: GIAMGIA), không được trống và phải là duy nhất
    voucher_discount_percentage DECIMAL(10, 2) DEFAULT 0.00 CHECK (voucher_discount_percentage >= 0), -- Tỷ lệ giảm giá (ví dụ: 15.00 cho 15%)
    voucher_discount_max_amount DECIMAL(10, 2) DEFAULT 0.00 CHECK (voucher_discount_max_amount >= 0), -- Số tiền giảm giá tối đa (ví dụ: 150000)
    voucher_usage_limit INT DEFAULT 1 CHECK (voucher_usage_limit > 0), -- Giới hạn số lần sử dụng voucher, mặc định là 1
    voucher_valid_from TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian bắt đầu hiệu lực voucher
    voucher_valid_to TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian kết thúc hiệu lực voucher (ví dụ: 30-09-2024)
    voucher_created_by INT, -- ID nhân viên đã tạo voucher (khóa ngoại tham chiếu đến bảng employees)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo voucher, mặc định là thời điểm hiện tại
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Thời gian cập nhật voucher, tự động cập nhật khi có thay đổi
    CONSTRAINT fk_vouchers_employees FOREIGN KEY (voucher_created_by) REFERENCES employees(employee_id), -- Ràng buộc khóa ngoại đến bảng employees
    CHECK (voucher_valid_to > voucher_valid_from) -- Ràng buộc kiểm tra thời gian hiệu lực voucher
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng voucher_conditions (Điều kiện của voucher)
CREATE TABLE voucher_conditions (
    condition_id INT AUTO_INCREMENT PRIMARY KEY, -- Khóa chính, ID điều kiện tự động tăng
    voucher_id INT NOT NULL, -- Khóa ngoại liên kết với bảng vouchers, không được để trống
    condition_type VARCHAR(255) NOT NULL, -- Loại điều kiện (min_order_value, category, ...), không được để trống
    condition_value VARCHAR(255) NOT NULL, -- Giá trị cụ thể của điều kiện (ví dụ: '500000', 'VIP', 'Monday', ...), không được để trống
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo điều kiện, mặc định là thời điểm hiện tại
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Thời gian cập nhật điều kiện, tự động cập nhật khi có thay đổi
    CONSTRAINT fk_voucher_conditions_vouchers FOREIGN KEY (voucher_id) REFERENCES vouchers(voucher_id) -- Ràng buộc khóa ngoại đến bảng vouchers
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng booking_tickets (Vé đã đặt)
CREATE TABLE booking_tickets (
    booking_id INT AUTO_INCREMENT PRIMARY KEY, -- ID duy nhất cho mỗi vé đã đặt, tự động tăng
    booking_code VARCHAR(255) NOT NULL UNIQUE, -- Mã đặt vé, phải là duy nhất
    booking_status VARCHAR(255) NOT NULL DEFAULT 'pending', -- Trạng thái booking (pending, confirmed, cancelled)
    booking_channel VARCHAR(255), -- Kênh đặt vé (web_channel, mobile, in_office)
    booking_number_of_ticket INT CHECK (booking_number_of_ticket > 0), -- Số lượng vé đã đặt (phải > 0)
    booking_total_price DECIMAL(10, 2) DEFAULT 0.00 CHECK (booking_total_price >= 0), -- Tổng tiền của vé
    discount_amount DECIMAL(10, 2) DEFAULT 0.00 CHECK (discount_amount >= 0), -- Số tiền đã được giảm từ voucher
    booking_note VARCHAR(500), -- Ghi chú về booking
    booking_session TEXT NOT NULL UNIQUE, -- Phiên đặt vé, phải là duy nhất
    customer_id INT NOT NULL, -- ID khách hàng
    office_pickup_id INT, -- Điểm đón khách hàng tại văn phòng
    office_dropoff_id INT, -- Điểm trả khách hàng
    transfer_point_name TEXT, -- Trung chuyển điểm đón
    return_point_name TEXT, -- Trung chuyển điểm trả
    payment_method_id INT, -- ID phương thức thanh toán
    payment_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian thanh toán
    payment_status VARCHAR(255) DEFAULT 'pending', -- Trạng thái thanh toán (pending, completed, failed)
    payment_reference_code TEXT, -- Mã giao dịch bên thứ ba, phải là duy nhất
    payment_user_code TEXT, -- ID người dùng giao dịch bên thứ ba
    payment_amount DECIMAL(10, 2) DEFAULT 0.00 CHECK (payment_amount >= 0), -- Số tiền thanh toán
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo bản ghi
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Thời gian cập nhật bản ghi
    voucher_id INT, -- ID voucher áp dụng cho vé (khóa ngoại tham chiếu đến bảng vouchers)
    CONSTRAINT fk_booking_tickets_payment_methods FOREIGN KEY (payment_method_id) REFERENCES payment_methods(payment_method_id), -- Liên kết với bảng payment_methods
    CONSTRAINT fk_booking_tickets_customers FOREIGN KEY (customer_id) REFERENCES customers(customer_id), -- Liên kết với bảng customers
    CONSTRAINT fk_booking_tickets_offices_pickup FOREIGN KEY (office_pickup_id) REFERENCES offices(office_id), -- Liên kết với bảng offices cho điểm đón
    CONSTRAINT fk_booking_tickets_offices_dropoff FOREIGN KEY (office_dropoff_id) REFERENCES offices(office_id), -- Liên kết với bảng offices cho điểm trả
    CONSTRAINT fk_booking_tickets_vouchers FOREIGN KEY (voucher_id) REFERENCES vouchers(voucher_id), -- Liên kết với bảng vouchers
    CHECK (booking_status IN ('pending', 'confirmed', 'cancelled')), -- Kiểm tra trạng thái booking
    CHECK (payment_status IN ('pending', 'completed', 'failed')) -- Kiểm tra trạng thái thanh toán
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng booking_ticket_details (Chi tiết vé đã đặt)
CREATE TABLE booking_ticket_details (
    booking_id INT NOT NULL, -- ID đặt vé.
    ticket_id INT NOT NULL, -- ID vé, khóa ngoại liên kết với bảng tickets.
    price DECIMAL(10, 2) DEFAULT 0.00 CHECK (price >= 0), -- Giá vé (phải >= 0).
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo bản ghi.
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Thời gian cập nhật bản ghi.
    PRIMARY KEY (booking_id, ticket_id), -- Cụm siêu khóa.
    CONSTRAINT fk_booking_ticket_details_booking_tickets FOREIGN KEY (booking_id) REFERENCES booking_tickets(booking_id) ON DELETE CASCADE, -- Liên kết với bảng booking_tickets.
    CONSTRAINT fk_booking_ticket_details_tickets FOREIGN KEY (ticket_id) REFERENCES tickets(ticket_id) ON DELETE CASCADE -- Liên kết với bảng tickets.
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng refunds (Hoàn tiền)
CREATE TABLE refunds (
    refund_id INT AUTO_INCREMENT PRIMARY KEY, -- ID duy nhất cho mỗi giao dịch hoàn tiền, tự động tăng.
    booking_id INT NOT NULL, -- ID đặt vé, khóa ngoại liên kết với bảng booking_tickets.
    ticket_id INT NOT NULL, -- Khóa ngoại liên kết với bảng tickets.
    refund_amount DECIMAL(10, 2) DEFAULT 0.00 NOT NULL CHECK (refund_amount >= 0), -- Số tiền hoàn lại (phải >= 0).
    refund_description VARCHAR(500), -- Mô tả về lý do hoàn tiền.
    refund_percentage DECIMAL(10, 2) DEFAULT 0.00 NOT NULL CHECK (refund_percentage >= 0 AND refund_percentage <= 100), -- Tỷ lệ hoàn tiền theo phần trăm (phải từ 0 đến 100).
    employee_id INT, -- Khóa ngoại liên kết với bảng employees.
    office_id INT, -- Khóa ngoại liên kết với bảng offices.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo bản ghi.
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Thời gian cập nhật bản ghi.
    refunded_at TIMESTAMP NULL, -- Thời gian hoàn tiền.
    is_refunded TINYINT(1) DEFAULT 0 CHECK (is_refunded IN (0, 1)), -- Trạng thái đã hoàn tiền hay chưa (0: chưa hoàn, 1: đã hoàn).
    refund_method VARCHAR(255), -- Phương thức hoàn tiền (online hoặc tại quầy - in_office).
    is_approved TINYINT(1) DEFAULT 0 CHECK (is_approved IN (0, 1)), -- Trạng thái duyệt hoàn tiền (0: chưa duyệt, 1: đã duyệt).
    CONSTRAINT fk_refunds_booking_tickets FOREIGN KEY (booking_id) REFERENCES booking_tickets(booking_id), -- Liên kết với bảng booking_tickets.
    CONSTRAINT fk_refunds_tickets FOREIGN KEY (ticket_id) REFERENCES tickets(ticket_id), -- Liên kết với bảng tickets.
    CONSTRAINT fk_refunds_employees FOREIGN KEY (employee_id) REFERENCES employees(employee_id), -- Liên kết với bảng employees.
    CONSTRAINT fk_refunds_offices FOREIGN KEY (office_id) REFERENCES offices(office_id), -- Liên kết với bảng offices.
    CHECK (refund_method IN ('online', 'in_office')) -- Ràng buộc kiểm tra phương thức hoàn tiền.
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng article_types (Loại tin tức)
CREATE TABLE article_types (
    article_type_id INT AUTO_INCREMENT PRIMARY KEY, -- Khóa chính, ID loại tin tức tự động tăng
    article_title VARCHAR(500) NOT NULL UNIQUE, -- Tiêu đề loại tin tức, không được để trống
    article_field VARCHAR(500) NOT NULL UNIQUE, -- Lĩnh vực mà loại tin tức, không được để trống
    is_highlight TINYINT(1) DEFAULT 0 CHECK (is_highlight IN (0, 1)), -- Cờ xác định xem loại tin tức này có nổi bật hay không (1 = có, 0 = không)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo bản ghi, mặc định là thời điểm hiện tại
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Thời gian cập nhật bản ghi, tự động cập nhật khi có thay đổi
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng articles (Tin tức)
CREATE TABLE articles (
    article_id INT AUTO_INCREMENT PRIMARY KEY, -- Khóa chính, ID bài viết tự động tăng
    article_title TEXT NOT NULL, -- Tiêu đề bài viết, không được để trống
    article_description TEXT, -- Mô tả ngắn về bài viết
    article_content TEXT NOT NULL, -- Nội dung chính của bài viết, không được để trống
    article_slug TEXT UNIQUE NOT NULL, -- Đường dẫn thân thiện (slug) cho bài viết, không được trùng lặp và không được để trống
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian công bố bài viết, mặc định là thời điểm hiện tại
    is_priority TINYINT(1) DEFAULT 0 CHECK (is_priority IN (0, 1)), -- Cờ xác định bài viết có được ưu tiên hiển thị hay không (1 = có, 0 = không)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo bài viết, mặc định là thời điểm hiện tại
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Thời gian cập nhật bài viết, tự động cập nhật khi có thay đổi
    article_type_id INT NOT NULL, -- ID loại tin tức (khóa ngoại tham chiếu đến bảng article_types), không được để trống
    employee_id INT NOT NULL, -- ID nhân viên viết bài (khóa ngoại tham chiếu đến bảng employees), không được để trống
    thumbnail_img TEXT, -- Hình ảnh đại diện cho bài viết
    CONSTRAINT fk_articles_employees FOREIGN KEY (employee_id) REFERENCES employees(employee_id), -- Ràng buộc khóa ngoại đến bảng employees
    CONSTRAINT fk_articles_article_types FOREIGN KEY (article_type_id) REFERENCES article_types(article_type_id) -- Ràng buộc khóa ngoại đến bảng article_types
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng image_articles (Hình ảnh của tin tức)
CREATE TABLE image_articles (
    image_article_id INT AUTO_INCREMENT PRIMARY KEY, -- Khóa chính, ID hình ảnh tự động tăng
    image_article_name TEXT, -- Tên file của hình ảnh
    image_article_url TEXT, -- Đường dẫn URL đến hình ảnh trên server hoặc cloud, không được để trống
    image_article_type VARCHAR(50), -- Kiểu file ảnh (jpg, png, gif,...)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo hình ảnh bài viết, mặc định là thời điểm hiện tại
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Thời gian cập nhật bài viết, tự động cập nhật khi có thay đổi
    article_id INT, -- ID bài viết mà hình ảnh liên kết đến (khóa ngoại tham chiếu đến bảng articles)
    CONSTRAINT fk_image_articles_articles FOREIGN KEY (article_id) REFERENCES articles(article_id) -- Ràng buộc khóa ngoại đến bảng articles
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng tags (Thẻ)
CREATE TABLE tags (
    tag_id INT AUTO_INCREMENT PRIMARY KEY, -- Khóa chính, ID thẻ tự động tăng
    tag_name VARCHAR(255) NOT NULL, -- Tên thẻ, không được trống và phải là duy nhất
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo tags, mặc định là thời điểm hiện tại
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Thời gian cập nhật quyền, tự động cập nhật khi có thay đổi
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng article_tags (Liên kết giữa bài viết và thẻ)
CREATE TABLE article_tags (
    article_id INT NOT NULL, -- ID bài viết (khóa ngoại tham chiếu đến bảng articles), không được để trống
    tag_id INT NOT NULL, -- ID thẻ (khóa ngoại tham chiếu đến bảng tags), không được để trống
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo bản ghi.
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Thời gian cập nhật bản ghi.
		PRIMARY KEY (article_id, tag_id), -- Khóa chính là sự kết hợp giữa article_id và tag_id
    CONSTRAINT fk_article_tags_articles FOREIGN KEY (article_id) REFERENCES articles(article_id), -- Ràng buộc khóa ngoại đến bảng articles
    CONSTRAINT fk_article_tags_tags FOREIGN KEY (tag_id) REFERENCES tags(tag_id) -- Ràng buộc khóa ngoại đến bảng tags
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng roles (Quyền)
CREATE TABLE roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY, -- Khóa chính, ID quyền tự động tăng
    role_name VARCHAR(255) NOT NULL UNIQUE, -- Tên quyền (ví dụ: Admin, User), không được để trống
    role_description VARCHAR(500), -- Mô tả quyền (ví dụ: Quyền quản trị hệ thống)
    role_value_url TEXT NOT NULL UNIQUE, -- Đường dẫn phân quyền
    is_deleted TINYINT(1) DEFAULT 0 CHECK (is_deleted IN (0, 1)), -- Trạng thái xóa, 0 là chưa xóa, 1 là đã xóa
    is_locked TINYINT(1) DEFAULT 0 CHECK (is_locked IN (0, 1)), -- Trạng thái khóa, 0 là không khóa, 1 là bị khóa
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo quyền, mặc định là thời điểm hiện tại
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Thời gian cập nhật quyền, tự động cập nhật khi có thay đổi
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng groups (Nhóm quyền)
CREATE TABLE groups (
    group_id INT AUTO_INCREMENT PRIMARY KEY, -- Khóa chính, ID nhóm tự động tăng
    group_name VARCHAR(255) NOT NULL UNIQUE, -- Tên nhóm, không được để trống
    group_description VARCHAR(500), -- Mô tả nhóm
    is_deleted TINYINT(1) DEFAULT 0 CHECK (is_deleted IN (0, 1)), -- Trạng thái xóa, 0 là chưa xóa, 1 là đã xóa
    is_locked TINYINT(1) DEFAULT 0 CHECK (is_locked IN (0, 1)), -- Trạng thái khóa, 0 là không khóa, 1 là bị khóa
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo nhóm, mặc định là thời điểm hiện tại
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Thời gian cập nhật nhóm, tự động cập nhật khi có thay đổi
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng role_groups (Nhóm quyền cho nhóm)
CREATE TABLE role_groups (
    role_id INT NOT NULL, -- Khóa ngoại liên kết với bảng roles
    group_id INT NOT NULL, -- Khóa ngoại liên kết với bảng groups
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo bản ghi.
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Thời gian cập nhật bản ghi.     
		PRIMARY KEY (role_id, group_id), -- Khóa chính là sự kết hợp giữa role_id và group_id
    CONSTRAINT fk_role_groups_roles FOREIGN KEY (role_id) REFERENCES roles(role_id), -- Ràng buộc khóa ngoại đến bảng roles
    CONSTRAINT fk_role_groups_groups FOREIGN KEY (group_id) REFERENCES groups(group_id) -- Ràng buộc khóa ngoại đến bảng groups
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng group_employees (Nhân viên thuộc nhiều nhóm quyền)
CREATE TABLE group_employees (
    group_id INT NOT NULL, -- Khóa ngoại liên kết với bảng groups
    employee_id INT NOT NULL, -- Khóa ngoại liên kết với bảng employees
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo bản ghi.
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Thời gian cập nhật bản ghi.
		PRIMARY KEY (group_id, employee_id), -- Khóa chính là sự kết hợp giữa group_id và employee_id
    CONSTRAINT fk_group_employees_groups FOREIGN KEY (group_id) REFERENCES groups(group_id), -- Ràng buộc khóa ngoại đến bảng groups
    CONSTRAINT fk_group_employees_employees FOREIGN KEY (employee_id) REFERENCES employees(employee_id) -- Ràng buộc khóa ngoại đến bảng employees
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;

-- Bảng group_customers (Khách hàng thuộc nhóm quyền)
CREATE TABLE group_customers (
    group_id INT NOT NULL, -- Khóa ngoại liên kết với bảng groups
    customer_id INT NOT NULL, -- Khóa ngoại liên kết với bảng customers
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời gian tạo bản ghi.
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Thời gian cập nhật bản ghi.s
		PRIMARY KEY (group_id, customer_id), -- Khóa chính là sự kết hợp giữa group_id và customer_id
    CONSTRAINT fk_group_customers_groups FOREIGN KEY (group_id) REFERENCES groups(group_id), -- Ràng buộc khóa ngoại đến bảng groups
    CONSTRAINT fk_group_customers_customers FOREIGN KEY (customer_id) REFERENCES customers(customer_id) -- Ràng buộc khóa ngoại đến bảng customers
) CHARACTER SET UTF8MB4 COLLATE UTF8MB4_UNICODE_CI;
