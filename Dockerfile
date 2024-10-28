# Use an official Node image as the base
FROM node:21.6.2-slim

# Set working directory in the container
WORKDIR /app

# Copy project files from the BeeApp subdirectory into the container
COPY BeeApp /app

#CMD ["cat", "package.json"]

# Install project dependencies
RUN npm install

# Expose Expo default port
EXPOSE 19000 8081 8082

# Start Expo server
CMD ["npx", "expo", "start", "--tunnel"]