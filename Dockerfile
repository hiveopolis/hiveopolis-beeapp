# Use an official Node image as the base
FROM node:10.5.0-slim

# Set working directory in the container
WORKDIR /app

# Copy project files from the BeeApp subdirectory into the container
COPY BeeApp /app

# Install project dependencies
RUN npm install

# Expose Expo default port
EXPOSE 19000

# Start Expo server
CMD ["npx", "expo", "start", "--tunnel"]
