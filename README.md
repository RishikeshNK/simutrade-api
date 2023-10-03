# SimuTrade API

SimuTrade API is a RESTful API built using [Express.js](https://expressjs.com/) and [Docker](https://www.docker.com/). It provides a platform for managing and trading simulated stocks and portfolios.

## Getting Started

[Swagger](https://swagger.io/) documentation would be written shortly. Please refer to [Route Map (Usage)](#route-map-usage) for more information regarding the implemented routes.

### Dependencies

- [Node.js](https://nodejs.org/en/download/package-manager/)
- [Docker](https://www.docker.com/)

### Route Map (Usage)
- [x] POST `/api/v1/auth/register`
    - Start by going to sending a POST request to `/api/v1/auth/register` and registering a new account.
    - Request format:
        ```json
        {
            "email": "test@example.com",
            "password": "password"
        }
        ```
    - Note down the accessToken returned and __set that as the bearer token__ (in Postman perhaps) by setting the "Authorization" header as `Bearer [accessToken]` where `accessToken` is the token you copied earlier.
- [x] POST `/api/v1/auth/login`
    - If your `accessToken` has expired, send a POST request to `/api/v1/auth/login` and set the bearer token similar to the registration route.
    - Request format:
        ```json
        {
            "email": "test@example.com",
            "password": "password"
        }
        ```
- [x] POST `/api/v1/auth/refreshToken`
    - In order to generate a new refresh token, send a POST request to `/api/v1/auth/refreshToken`.
    - Request format:
        ```json
        {
            "refreshToken": "[token]"
        }
        ```
- [x] POST `/api/v1/auth/revokeRefreshTokens` (Do __not__ use in production)
    - In order to revoke tokens for a user (during a password reset perhaps), send a POST request to `/api/v1/auth/revokeRefreshTokens`. Do not expose this end-point in production (only for development purposes)!
    - Request format:
        ```json
        {
            "userId": "[userId]"
        }
        ```
- [x] GET `/api/v1/users/profile`
    - In order to get information about the logged-in user, send a GET request to `/api/v1/users/profile`.
- [x] GET `/api/v1/users/holdings`
    - In order to get all the holdings of the logged-in user, send a GET request to `/api/v1/users/holdings`.
- [ ] GET `/api/v1/users/trades`
- [ ] GET `/api/v1/stocks`
- [ ] POST `/api/v1/trade/buy`
- [ ] POST `/api/v1/trade/sell`
- [ ] POST `/api/v1/trade/quote`

### Usage

To get started with SimuTrade API, follow the steps below:

1. Clone the repository.

```bash
git clone git@github.com:RishikeshNK/simtrade-api.git
cd simutrade-api
```

2. Install the necessary dependencies by running `npm install`.
3. Configure the `.env` file by following the template in `.env.example`. See [Setting up the environment](#setting-up-the-environment).
4. Run the docker container.
```bash
docker compose up -d
```
4. Run the application

```bash
npm start
```

### Setting up the environment

1. Create a new file called `.env` or copy the `.env.example` and rename it to `.env`.

```bash
cp .env.example .env
```

2. Complete the file to add your environment variables.