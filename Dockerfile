# Use an official Node image as the base
FROM node:18-slim

# Set working directory in the container
WORKDIR /app

# Copy project files from the BeeApp subdirectory into the container
COPY BeeApp /app

# Install Expo CLI globally
RUN npm install -g expo-cli

# Install project dependencies
RUN npm install

# Expose Expo default port
EXPOSE 19000

# Start Expo server
CMD ["expo", "start", "--tunnel"]
