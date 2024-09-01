# Use the Bun image as the base image
FROM oven/bun:alpine

# Set the working directory in the container
WORKDIR usr/src/app

# Copy the package manifest and lock file
COPY package.json ./

# Install dependencies
RUN bun install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Run the application
CMD ["bun", "run", "start"]
