# Use an official Node image as the base
FROM node:18-slim

# Set working directory in the container
WORKDIR /app

# Ensure npm is at version 10.5.0
RUN npm install -g npm@10.5.0

# Install Expo CLI globally
RUN npm install -g expo-cli

# Copy project files from the BeeApp subdirectory into the container
COPY BeeApp /app

# Install project dependencies
RUN npm install

# Expose Expo default port
EXPOSE 19000

# Start Expo server
CMD ["expo", "start", "--tunnel"]
