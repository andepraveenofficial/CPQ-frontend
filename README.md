# CPQ Frontend Project

## Installation

- `npm install`

## Start the Application

- `npm start`

### Docker:

- Create Image: `docker build -t <image_name> .`
  - `docker build -t cpq-frontend:0.0.4 .`
- Create and Run the Container: `docker run --name <container_name> -p <host_port>:<container_port> <image_name>`
  - `docker run --name cpq-frontend-4 -p 3000:3000 cpq-frontend:0.0.4`
- push docker image to docke hub

  - Add Tag `docker tag cpq-frontend:0.0.4 andepraveen/cpq-frontend:0.0.4`
  - push `docker push andepraveen/cpq-frontend:0.0.4`

- Run yml file for containers:
  - Existing Containers :`docker compose up -d`
  - New Updated files : `docker-compose up --build -d`

### End
