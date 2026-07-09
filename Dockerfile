FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the files
COPY . .

# Build Vite frontend
RUN npm run build

# Expose port
EXPOSE 3001

# Set production environment
ENV NODE_ENV=production
ENV PORT=3001

# Start the server
CMD ["node", "server/index.js"]
