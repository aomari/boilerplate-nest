
# Setup and Run MySQL and NestJS Backend with Docker Compose

This guide provides step-by-step instructions on how to run MySQL and NestJS backend services using Docker Compose on your local machine or server.

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

- **Docker**: Docker must be installed on your machine. If you haven't installed Docker yet, follow the installation guide [here](https://docs.docker.com/get-docker/).
- **Docker Compose**: Docker Compose (with the `docker compose` command) must be installed. If not, install it following this guide: [Install Docker Compose](https://docs.docker.com/compose/install/).

## Folder Structure

Ensure that the folder structure on your local machine is similar to the one shown below:

```
.
├── dockers/
│   ├── nestjs-backend.Dockerfile
│   ├── nestjs-docker-compose.yml
│   └── mysql-docker-compose.yml
└── ...
```

### Files:
- `nestjs-backend.Dockerfile`: Contains the Dockerfile for building the NestJS backend image.
- `nestjs-docker-compose.yml`: The Docker Compose configuration for the NestJS backend service.
- `mysql-docker-compose.yml`: The Docker Compose configuration for the MySQL service.

## Steps to Run the Services

### 1. Start MySQL Service

First, start the MySQL container using the `mysql-docker-compose.yml` file.

#### 1.1 Navigate to the MySQL Docker Compose Directory

Open a terminal and navigate to the folder containing `mysql-docker-compose.yml`.

```bash
cd /dockers
```

#### 1.2 Run the MySQL Docker Compose Command

Run the following command to start the MySQL service:

```bash
docker compose -f mysql-docker-compose.yml up -d
```

- This command will pull the MySQL Docker image (if not already downloaded), create a container for the MySQL service, and start it in detached mode (`-d`).
- The MySQL service will be accessible on port `3307` on your host machine.

#### 1.3 Verify the MySQL Container is Running

To verify that the MySQL container is running, use the following command:

```bash
docker compose -f mysql-docker-compose.yml ps
```

This will show the status of your containers. You should see `mysql-container` listed as "Up".

### 2. Start NestJS Backend Service

Next, start the NestJS backend container using the `nestjs-docker-compose.yml` file.

#### 2.1 Navigate to the NestJS Docker Compose Directory

Open a terminal and navigate to the folder containing `nestjs-docker-compose.yml`.

```bash
cd /dockers
```

#### 2.2 Run the NestJS Docker Compose Command

Run the following command to start the NestJS backend service:

```bash
docker compose -f nestjs-docker-compose.yml up -d
```

- This command will build the NestJS backend image using the `nestjs-backend.Dockerfile`, create a container for the backend, and start it in detached mode (`-d`).
- The NestJS backend service will be accessible on port `3000` on your host machine.

#### 2.3 Verify the NestJS Container is Running

To verify that the NestJS container is running, use the following command:

```bash
docker compose -f nestjs-docker-compose.yml ps
```

This will show the status of your containers. You should see `nestjs-backend-container` listed as "Up".

### 3. Verify the Services

Once both containers are running, you can verify that the services are working correctly.

#### 3.1 Verify MySQL Service

The MySQL service should be accessible at `localhost:3307` on your host machine. You can connect to the MySQL database using a MySQL client or via command line with the following credentials:

- **Host**: `localhost`
- **Port**: `3307`
- **Username**: `nestjs_user`
- **Password**: `nestjs_password`
- **Database**: `nestjs_db`

#### 3.2 Verify NestJS Backend Service

The NestJS backend service should be accessible at `localhost:3000` on your host machine. You can test if the service is up and running by visiting the URL `http://localhost:3000` in your browser or using a tool like `curl`:

```bash
curl http://localhost:3000
```

If everything is set up correctly, you should receive a response from the NestJS backend.

#### 3.3 Swagger Documentation

The NestJS backend service includes Swagger documentation for the API. You can access it at:

[http://localhost:3000/api](http://localhost:3000/api)

This link will show you the interactive API documentation where you can explore and test the available API endpoints.

### 4. Stopping the Services

To stop the services, you can use the following commands:

#### 4.1 Stop MySQL Service

Run the following command from the folder containing `mysql-docker-compose.yml`:

```bash
docker compose -f mysql-docker-compose.yml down
```

This will stop and remove the MySQL container.

#### 4.2 Stop NestJS Backend Service

Run the following command from the folder containing `nestjs-docker-compose.yml`:

```bash
docker compose -f nestjs-docker-compose.yml down
```

This will stop and remove the NestJS backend container.

### 5. Cleaning Up

To remove the containers, networks, and volumes created by `docker compose up`, run the following commands:

#### 5.1 Clean Up MySQL Service

```bash
docker compose -f mysql-docker-compose.yml down --volumes --remove-orphans
```

This command will:
- Stop the MySQL container
- Remove the associated volume (`mysql-data`)
- Remove any orphaned containers

#### 5.2 Clean Up NestJS Backend Service

```bash
docker compose -f nestjs-docker-compose.yml down --volumes --remove-orphans
```

This command will:
- Stop the NestJS backend container
- Remove the associated volumes
- Remove any orphaned containers

### 6. Troubleshooting

If you encounter any issues, here are some common solutions:

- **MySQL container not starting**: Ensure there are no port conflicts with other services using port `3307`. You can change the exposed port in the `mysql-docker-compose.yml` file.
  
- **NestJS container not connecting to MySQL**: Ensure that the `DB_HOST` environment variable in the `nestjs-docker-compose.yml` is set to `mysql` (the name of the MySQL service in the `mysql-docker-compose.yml` file).

- **Ports already in use**: If the ports `3307` or `3000` are already being used, you can modify the `docker compose` files to use different ports.

---

## Additional Notes

- **Networking**: Both services are connected via an external network (`nestjs-network`). This allows them to communicate with each other. The NestJS backend connects to the MySQL database using the hostname `mysql` (as specified in the `DB_HOST` environment variable).

- **Persistent Data**: The MySQL service is configured to store its data in a volume (`mysql-data`). This ensures that even if the container is removed, the data will persist. You can inspect or configure volumes with the following command:

  ```bash
  docker volume ls
  ```
