<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

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
   - Open your browser and navigate to [http://localhost:3000/api-docs](http://localhost:3000/api-docs) to access the Swagger documentation.


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
