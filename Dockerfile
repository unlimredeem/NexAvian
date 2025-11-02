# Stage 1: Use a lightweight, secure base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# --- THIS IS THE FIX ---
# Copy package.json and package-lock.json from the 'backend' folder
COPY backend/package*.json ./

# Install production dependencies
# --omit=dev skips devDependencies (like nodemon)
RUN npm install --omit=dev

# --- THIS IS THE SECOND FIX ---
# Copy the rest of your app code from the 'backend' folder
COPY backend/ .

# Expose a default port. Back4App will override this with its own PORT.
EXPOSE 3000

# Command to start your server
CMD [ "node", "server.js" ]
