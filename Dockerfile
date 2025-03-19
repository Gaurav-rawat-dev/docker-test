# Use an official Node.js image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json before running npm install
COPY package.json ./

# Define a build argument (defaults to production if not provided)
ARG NODE_ENV=production

# Set NODE_ENV based on the build argument
ENV NODE_ENV=${NODE_ENV}

# Install dependencies (exclude dev dependencies in production)
RUN if [ "$NODE_ENV" = "production" ]; then npm install --omit=dev; else npm install; fi

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]
