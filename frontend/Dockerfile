FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm ci

# Copy source
COPY frontend ./

# Build Next.js app
RUN npm run build

ENV NEXT_TELEMETRY_DISABLED=1
EXPOSE 3000

# Run production server
CMD ["npx","next","start","-H","0.0.0.0","-p","3000"]
