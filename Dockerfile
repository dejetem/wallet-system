FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application with verbose output
RUN echo "Building TypeScript..." && \
    npm run build || (echo "Build failed!" && exit 1) && \
    echo "Build completed. Listing dist directory:" && \
    ls -la dist/ && \
    echo "Contents of dist:" && \
    find dist/ -type f -name "*.js" | head -10


EXPOSE 3000

# Use node to run the built application
CMD ["node", "dist/src/index.js"]