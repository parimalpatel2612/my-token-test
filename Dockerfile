# Multi-stage build for efficient image size

# Stage 1: Build environment
FROM node:18-alpine as builder

WORKDIR /app

# Install dependencies first for better caching
COPY package.json package-lock.json ./
RUN npm ci

# Copy all files
COPY . .

# Compile contracts
RUN npx hardhat compile

# Stage 2: Runtime environment
FROM node:18-alpine

WORKDIR /app

# Copy built artifacts and necessary files
COPY --from=builder /app/artifacts ./artifacts
COPY --from=builder /app/contracts ./contracts
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json .
COPY --from=builder /app/api ./api
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/hardhat.config.js .
COPY --from=builder /app/config ./config 

# Install additional runtime dependencies if needed
RUN npm install -g wait-port

# Expose ports
EXPOSE 8545 8081

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8001/health || exit 1

# Entrypoint script
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]