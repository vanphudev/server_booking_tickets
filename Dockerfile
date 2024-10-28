# Sử dụng image node chính thức
FROM node:18

# Đặt thư mục làm việc trong container
WORKDIR /usr/src/app_server

# Sao chép file package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép tất cả mã nguồn của bạn vào container
COPY . .

# Mở port ứng dụng (điều chỉnh theo port bạn dùng)
EXPOSE 8888

# Lệnh để chạy ứng dụng
CMD ["npm", "start"]
