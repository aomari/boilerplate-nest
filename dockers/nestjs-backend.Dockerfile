# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /src

# Copy dependency files
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install --frozen-lockfile

# Copy application source code
COPY . .

# Build the application
RUN yarn build

# Stage 2: Production image
FROM node:18-alpine

# Set the working directory
WORKDIR /src

# Copy build output and necessary files from the builder stage
COPY --from=builder /src/dist ./dist
COPY --from=builder /src/package.json /src/yarn.lock ./

# Install production dependencies
RUN yarn install --frozen-lockfile --production

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"]
