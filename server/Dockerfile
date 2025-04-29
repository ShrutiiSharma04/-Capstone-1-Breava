# server/Dockerfile
FROM node:18-alpine

# 1. Set working directory
WORKDIR /app

# 2. Copy manifest files
COPY package.json package-lock.json ./

# 3. Install dependencies
RUN npm ci --only=production

# 4. Copy your source code
COPY . .

# 5. Expose the port your Node app uses
EXPOSE 5000

# 6. Run the app—replace `app.js` with your actual entrypoint if different
CMD ["node", "app.js"]

