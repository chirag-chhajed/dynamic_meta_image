# Use node base image with version 16.x
FROM node:16

# Set the working directory to /app
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the Next.js project to /app
COPY . .

# Build the Next.js project
RUN npm run build

# Expose port 3000 for the application
EXPOSE 3000

# Start the application
CMD ["npm", "start"]