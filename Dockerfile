#prepare nodejs environment 18/alpine
FROM node:18-alpine

#Define directory in Docker
WORKDIR /sso-api/backend

# Install required packages first
RUN apk add --no-cache curl netcat-openbsd

# Create scripts directory and copy wait-for script
COPY wait-for.sh /scripts/wait-for.sh
RUN chmod +x /scripts/wait-for.sh
RUN dos2unix /scripts/wait-for.sh

# Copy and install dependencies
COPY package*.json ./
RUN npm install
RUN npm install -g @babel/core @babel/cli

# Copy the rest of the application
COPY . .

RUN npm run build-src
# Use the script with full path
CMD ["/bin/sh", "-c", "/scripts/wait-for.sh db-mysql-sso 3306 -- npm run migrate:up && npm run build"]