<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Boilerplate NestJS

![GitHub Actions Status](https://img.shields.io/github/workflow/status/aomari/boilerplate-nest/ci)

A NestJS boilerplate for building scalable and maintainable backend applications. Includes authentication, authorization, and common utilities.

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- Yarn (v1.22 or later)
- Docker (optional, for running the database)

### Installation

1. **Clone the Repository**:

   ```bash
   git clone git@github-personal:aomari/boilerplate-nest.git
   cd boilerplate-nest
   ```

### Modify Database Configurations:

- Update the `.env.dev` file with the following database configurations to match the Docker image:
  ```env
  DB_HOST=localhost
  DB_PORT=3306
  DB_USER=nestjs_user
  DB_PASSWORD=nestjs_password
  DB_NAME=nestjs_db
  ```

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# to run the project using specific port
$ PORT=4000 yarn run start:dev:local

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Health Check Endpoints

This project uses `@nestjs/terminus` to provide health check endpoints.

### Installation

To install the necessary packages, run:

```sh
npm install @nestjs/terminus @nestjs/axios axios
```

## Health Check

The health check endpoint allows you to verify the status of the application and its connected resources.

### Available Health Checks
When accessing the `/health` endpoint, the following checks are performed:

1. **HTTP Ping Check**: Pings the NestJS documentation site to ensure the HTTP service is working.
2. **Database Ping Check**: Pings the database to verify that it is reachable and operational.
3. **Memory Health Check**: Monitors the heap and RSS memory usage.
4. **Disk Health Check**: Monitors the disk space usage.

### Example

To check the health of the application, send a `GET` request to the `/health` endpoint:

```bash
curl http://localhost:3000/health
```

The response will provide the status of the health checks, showing whether each check has passed or failed.

### Step 8: Verify Health Check
1. Start your application by running the following command:
```sh
npm run start:dev
```
2. Verify the health check status by visiting the following URL in your browser or using curl:
```sh
curl http://localhost:3000/health
```
Or simply open the URL in your browser: http://localhost:3000/health.

3. You should receive a response indicating the status of the health checks, confirming that your application and database are reachable and operational.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

## Throttling Configuration

The project uses the `@nestjs/throttler` package to implement rate limiting. This helps to control the number of requests a client can make to the server within a specified time period, preventing abuse and ensuring fair usage of the API.

### Throttling Strategies

The following throttling strategies are configured in the project:

1. **Short Term**:

   - **TTL**: 1 second
   - **Limit**: 3 requests

2. **Medium Term**:

   - **TTL**: 10 seconds
   - **Limit**: 20 requests

3. **Long Term**:
   - **TTL**: 60 seconds
   - **Limit**: 100 requests

### Global Throttling Guard

The `ThrottlerGuard` is applied globally to all routes and controllers in the application. This ensures that rate limiting is enforced across the entire application.

### Benefits of Throttling

- **Prevent Abuse**: Protects the application from potential denial-of-service (DoS) attacks by limiting the number of requests a client can make.
- **Fair Usage**: Ensures that all clients have fair access to the API by preventing any single client from monopolizing server resources.
- **Easy Configuration**: Centralized configuration makes it easy to manage and adjust rate limiting settings as needed.

## GitHub Actions

#### **Overview**

This CI (Continuous Integration) pipeline automates various tasks to ensure code quality, security, and successful project builds. The pipeline triggers on:

1. Pull requests targeting the `main` branch.
2. Pushes directly to the `main` branch.

#### **Workflow Steps**

1. **Check out Repository**: Clones the repository into the runner environment.
2. **Cache Node.js Modules**:
   - Speeds up workflow by reusing previously installed `node_modules`.
   - Cache is identified by the hash of the `yarn.lock` file.
3. **Set up Node.js**:
   - Ensures the runner uses the latest LTS version of Node.js.
4. **Verify Node.js Version**: Validates the Node.js version installed in the runner.
5. **Install Dependencies**: Uses Yarn to install required project packages.
6. **Compile TypeScript**: Converts TypeScript code to JavaScript.
7. **Run Lint**: Lints the code for style and potential errors.
8. **Run Security Audit**: Scans dependencies for security vulnerabilities.
9. **Build Project**: Builds the final version of the project.
10. **(Optional) Run Tests**: Executes the test suite to verify functionality (currently commented out).
11. **(Optional) Generate Coverage Report**: Produces a report showing test coverage (currently commented out).

#### **Customizations**

- **Caching**: Optimizes dependency installation by caching the `node_modules` directory.
- **Node.js Version**: Uses the latest LTS version for stability and long-term support.
- **Extendable Steps**: The commented-out test and coverage steps can be activated if required.

#### **Error Recovery**

- The pipeline logs each step's output, aiding in debugging.
- Failure in any step halts subsequent steps for quick resolution.

## How to Run the Project

To run the project, follow these steps:

1. **Run the Docker Image**:

   - Navigate to the `dockers` directory and start the Docker container using `docker-compose.yml`:
     ```bash
     cd dockers
     docker-compose up -d
     ```

2. **Modify Database Configurations**:

   - Update the `.env.dev` file with the following database configurations to match the Docker image:
     ```env
     DB_HOST=localhost
     DB_PORT=3306
     DB_USER=nestjs_user
     DB_PASSWORD=nestjs_password
     DB_NAME=nestjs_db
     ```

3. **Install Dependencies**:

   - Install the required project dependencies using Yarn:
     ```bash
     yarn install
     ```

4. **Start the Project in Development Mode**:

   - Start the project in development mode:
     ```bash
     yarn start:dev
     ```

5. **Access Swagger Documentation**:
   - Open your browser and navigate to [http://localhost:3000/api](http://localhost:3000/api) to access the Swagger documentation.

## How to Generate Technical Documentation

To generate the technical documentation for the project, follow these steps:

1. **Generate Documentation**:

   - Run the following command to generate the documentation:

     ```bash
     yarn docs
     ```

   - This command will use TypeDoc to generate the documentation and output it to the docs folder.

2. **Access the Documentation**:
   - Once the documentation is generated, you can access it by opening the docs/index.html file in your browser.

By following these steps, you will be able to generate and access the technical documentation for the project.

## Contact

For any questions or inquiries, please contact Amjad Omari at aomari@asaltech.com.
