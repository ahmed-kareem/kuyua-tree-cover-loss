# FROM node:22.2.0-alpine AS builder

# # Set working directory
# WORKDIR /src

# COPY ["/kuyua.tree.cover.loss.API/package*.json", "kuyua.tree.cover.loss.API/"]

# # COPY  package.json package-lock.json ./

# RUN npm install

# # Copy the rest of your project files (excluding node_modules)
# COPY . .
# WORKDIR "/src/tree.cover.API"
# COPY . .
# # Use a smaller runtime image for production
# FROM node:22.2.0-alpine

# # Set working directory
# WORKDIR /app

# # Copy only the production files (exclude development dependencies)
# COPY --from=builder /app/node_modules ./node_modules
# COPY . .

# # Expose the port your application runs on (adjust if different)
# EXPOSE 3000

# # Start the command defined in your package.json (e.g., npm start)
# CMD [ "npm", "start" ]


FROM node:22.2.0-alpine
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start"]