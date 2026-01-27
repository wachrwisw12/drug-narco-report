# ---------- build react ----------
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ---------- serve with nginx ----------
FROM nginx:alpine

# 🔥 ลบ default nginx config (ห้ามขาด)
RUN rm -f /etc/nginx/conf.d/default.conf

# ใส่ config ของเรา
COPY nginx.conf /etc/nginx/conf.d/default.conf

# ใส่ react build
# COPY --from=builder /app/dist /usr/share/nginx/html/drugnaco/
COPY dist /usr/share/nginx/html/drugnaco/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
