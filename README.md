<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
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
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>


## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Application](#running-the-application)
5. [API Endpoints](#api-endpoints)
6. [Frontend Usage](#frontend-usage)
7. [Environment Variables](#environment-variables)
8. [Deployment](#deployment)
9. [Testing](#testing)
10. [Troubleshooting](#troubleshooting)


## Introduction

Scissor is a URL shortening service built with the NestJS framework and MongoDB. It allows users to shorten long URLs, customize their shortened URLs, and optionally generate QR codes for easy access.

## Features

- Shorten long URLs
- Customize short URLs
- Generate QR codes for shortened URLs
- Track usage and clicks
- View URL history
- User authentication and authorization

## Technologies Used

- **Backend**: NestJS, Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: HTML, CSS, JavaScript
- **Authentication**: JWT
- **Other Tools**: memory cache (for caching), QRCode (for generating QR codes).

## Getting Started

### Prerequisites

- Node.js (v14.x or higher)
- MongoDB
- Memory cache (caching)
- A modern web browser

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/scissor.git
    cd scissor
    ```

2. Install backend dependencies:
    ```bash
    npm install
    ```


### Running the Application

1. Start the MongoDB server.

2. Start the Redis server (if using caching).

3. Start the backend server:
    ```bash
    npm run start
    ```

4. Open `public/index.html` in a web browser to use the frontend interface.

## API Endpoints

### Authentication

- **Register**
    - **Endpoint**: `/auth/register`
    - **Method**: POST
    - **Description**: Register a new user.
    - **Body Parameters**:
        ```json
        {
          "username": "yourUsername",
          "email": "youremail@example.com",
          "password": "yourpassword"
        }
        ```

- **Login**
    - **Endpoint**: `/auth/login`
    - **Method**: POST
    - **Description**: Log in an existing user.
    - **Body Parameters**:
        ```json
        {
          "email": "youremail@example.com",
          "password": "yourpassword"
        }
        ```

        - **update user details**
    - **Endpoint**: `/users/:userId`
    - **Method**: PUT
    - **Description**: Update details of an existing user.
    - **Body Parameters**:
        ```json
        {
          "email": "updatedemail@example.com",
          "username": "updatedUsername"
        }
        ```

        - **Delete Profile**
    - **Endpoint**: `/users/:userId`
    - **Method**: DELETE
    - **Description**: Delete an existing user.
    - **Body Parameters**:
        ```json
        {
          "email": "youremail@example.com",
          "password": "yourpassword"
        }
        ```

        

### URL Shortening

- **Shorten URL**
    - **Endpoint**: `/url/shorten`
    - **Method**: POST
    - **Description**: Shorten a long URL.
    - **Headers**: `Authorization: Bearer <token>`
    - **Body Parameters**:
        ```json
        {
          "originalUrl": "https://www.example.com",
          "customShortUrl": "custom123", //Optional
        }
        ```

        - **Customize short URL**
    - **Endpoint**: `/url/customize-short-url`
    - **Method**: POST
    - **Description**: Shorten a long URL.
    - **Headers**: `Authorization: Bearer <token>`
    - **Body Parameters**:
        ```json
        {
          "shortUrl": "shortUrl",
          "customShortUrl": "custom123", 
        }
        ```

        - **Generate QrCode**
    - **Endpoint**: `/url/generate-qr-code`
    - **Method**: POST
    - **Description**: Generate QrCode for shortened Url.
    - **Headers**: `Authorization: Bearer <token>`
    - **Body Parameters**:
        ```json
        {
           "shortUrl": "shortenedUrl"
        }
        ```

- **Get Link History**
    - **Endpoint**: `/url/user/:userId`
    - **Method**: GET
    - **Description**: Get the history of shortened URLs for a user.
    - **Headers**: `Authorization: Bearer <token>`
 
- **Get URL Analytics**
    - **Endpoint**: `/url/:linkId`
    - **Method**: GET
    - **Description**: Get the analytics(number of clicks and sources) of shortened URLs for a user.
    - **Headers**: `Authorization: Bearer <token>

## Frontend Usage

1. Open `frontend/home.html` in a web browser.
2. Enter the original URL you want to shorten.
3. (Optional) Enter a custom alias for the shortened URL.
4. (Optional) Check the "Generate QR Code" checkbox.
5. Click the "Shorten link" button.
6. The shortened URL and QR code (if generated) will be displayed.

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```plaintext
DB_URI=mongodb://localhost:27017/scissor
JWT_SECRET=yourjwtsecret
JWT_EXPIRES=token-expiry-time


Deployment
The project can be deployed using various platforms.

- Create a new web service on prefered hosting platform.
- Connect your GitHub repository.
- Set up the environment variables.
- Deploy the service.



# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
