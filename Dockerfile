# Stage 1: Build
FROM node:22-alpine as builder

WORKDIR /my-space

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Stage 2: Runner
FROM node:22-alpine as runner

WORKDIR /my-space

# Copy necessary files and directories from the builder stage
COPY --from=builder /my-space/package.json .
COPY --from=builder /my-space/package-lock.json .
COPY --from=builder /my-space/next.config.mjs ./
COPY --from=builder /my-space/prisma ./prisma
COPY --from=builder /my-space/node_modules ./node_modules
COPY --from=builder /my-space/public ./public
COPY --from=builder /my-space/.next/standalone ./
COPY --from=builder /my-space/.next/static ./.next/static

# Expose the application port
EXPOSE 3000

# Start the application
ENTRYPOINT ["npm", "start"]
