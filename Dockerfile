# ---------- build react ----------
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ---------- serve with nginx ----------
FROM nginx:alpine

# เอาไฟล์ build มาใส่ nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# ใช้ nginx config ของเรา
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]