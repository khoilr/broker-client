# Use the Node.js 18 Alpine base image
FROM node:18-alpine

# Copy package.json to the /app directory in the container
COPY package.json ./app

# Set the working directory to /app
WORKDIR /app

# Install dependencies based on the package.json file
RUN npm install

# Copy the entire local directory to the /app directory in the container
COPY . ./app

# Build the project (assumes you have a build script defined in your package.json)
RUN npm run build

# Expose port 3000 to allow external access to the application
EXPOSE 3000

# Start the application using "npm start" as the command
CMD ["npm", "start"]
