# Use Node.js base image
FROM node:20

# Create app directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose ports (adjust if different)
EXPOSE 5173 3000

# Default command is bash; container won't start any servers by default
CMD ["bash"]
