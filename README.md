# CPQ Frontend Project

## Installation
* `npm install`

## Start the Application
* `npm start`

### Docker:
* Create Image: `docker build -t <image_name> .`
  - `docker build -t cpq-frontend:0.0.3 .`
* Create and Run the Container: `docker run --name <container_name> -p <host_port>:<container_port> <image_name>`
  - `docker run --name cpq-frontend-2 -p 3000:3000 cpq-frontend:0.0.2`
* push docker image to docke hub
  - Add Tag `docker tag cpq-frontend:0.0.3 andepraveen/cpq-frontend:0.0.3`
  - push `docker push andepraveen/cpq-frontend:0.0.3`

* Run yml file for containers: `docker compose up -d`
