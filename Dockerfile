# Install dependencies only when needed
FROM node:latest AS deps
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Generate Prisma client
RUN npx prisma generate

# Production image, copy all the files and run next
FROM node:latest AS runner
WORKDIR /app

# Copy application files
COPY . .

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules


# Install production dependencies
RUN npm install --only=production

EXPOSE 3000

# Command is set in docker-compose.yml
