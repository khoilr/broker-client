# Use the official Node.js alpine image as the base image
FROM node:alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the desired port
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "start"]
