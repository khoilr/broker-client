# Use the official Node.js 18-alpine image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json .

# Install dependencies
RUN npm install

# Copy the entire Next.js app to the working directory
COPY . .

# Build the Next.js app for production
RUN npm run build

# Expose the desired port (adjust if necessary)
EXPOSE 3000

# Set the command to run the Next.js app
CMD ["npm", "run", "start"]
