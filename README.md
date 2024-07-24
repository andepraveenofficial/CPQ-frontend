# CPQ Frontend Project

## Installation
* `npm install`

## Start the Application
* `npm start`

### Docker:
* Create Image: `docker build -t <image_name> .`
* Create and Run the Container: `docker run --name <container_name> -p <host_port>:<container_port> <image_name>`
  - `docker run --name cpq-frontend-2 -p 3000:3000 cpq-frontend:0.0.2`

* Run yml file for containers: `docker compose up -d`
