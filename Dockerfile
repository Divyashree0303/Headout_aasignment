# Use a multi-stage build for smaller final image
FROM node:14 as builder

WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./
RUN npm install

COPY . .

# Run the generateFiles.js script
RUN node generateFiles.js

# Start a new stage for the final image
FROM node:14-slim

WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app /app

# Install only production dependencies
RUN npm install --only=production

# Expose port 8080
EXPOSE 8080

# Set environment variables
ENV NODE_ENV=production

# Command to run the application
CMD ["npm", "start"]
