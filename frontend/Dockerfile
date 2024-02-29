# FROM nginx:alpine
# COPY ../dist/frontend/browser /usr/share/nginx/html
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf

FROM node:20.11.1 as build
WORKDIR /source

# Copy the package lock file into the container
COPY package*.json ./
# Run ci only for the production dependencies
RUN npm ci

# Copy the rest of the files into the container and build
COPY . .
RUN npm run build --prod

FROM nginx:alpine
COPY --from=build /source/dist/frontend/browser /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=build. /source/nginx.conf /etc/nginx/conf.d/