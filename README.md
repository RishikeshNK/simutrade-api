# SimuTrade API

SimuTrade API is a RESTful API built using [Express.js](https://expressjs.com/) and [Docker](https://www.docker.com/). It provides a platform for managing and trading simulated stocks and portfolios.

## Getting Started

[Swagger](https://swagger.io/) documentation would be written shortly. Please refer to [Route Map (Usage)](#route-map-usage) for more information regarding the implemented routes. For installation instructions, please follow the instructions in [Usage](#usage) below.

### Dependencies

- [Node.js](https://nodejs.org/en/download/package-manager/)
- [Docker](https://www.docker.com/)

### Route Map (Usage)
- [x] POST `/api/v1/auth/register`
    - Start by sending a POST request to `/api/v1/auth/register` and registering a new account.
    - Request format:
        ```json
        {
            "email": "test@example.com",
            "password": "password"
        }
        ```
    - Note down the `accessToken` returned and __set that as the Bearer token__ (in Postman perhaps) by setting the "Authorization" header as `Bearer [accessToken]` where `[accessToken]` is the token you copied earlier. For more information on configuring request headers, see the [Postman documentation](https://learning.postman.com/docs/sending-requests/requests/#configuring-request-headers).
- [x] POST `/api/v1/auth/login`
    - To log in to an existing account, send a POST request to `/api/v1/auth/login`. Copy the `accessToken` and set it as the Bearer token similar to the registration step.
    - Request format:
        ```json
        {
            "email": "[email]",
            "password": "[password]"
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
- [x] POST `/api/v1/auth/revokeRefreshTokens` (Do __not__ expose this end-point in a production environment)
    - In order to revoke tokens for a user, send a POST request to `/api/v1/auth/revokeRefreshTokens`. Do not expose this end-point in production (only for development purposes)!
    - Request format:
        ```json
        {
            "userId": "[userId]"
        }
        ```
    - One possible use case for this end-point is for allowing a password reset functionality in the future.
- [x] GET `/api/v1/users/profile`
    - In order to get information about the logged-in user, send a GET request to `/api/v1/users/profile`.
- [x] GET `/api/v1/users/holdings`
    - In order to get all the holdings of the logged-in user, send a GET request to `/api/v1/users/holdings`.
- [x] GET `/api/v1/users/transactions`
    - In order to get all the past transactions of the logged-in user, send a GET request to `/api/v1/users/transactions`
- [x] GET `/api/v1/stocks/all`
    - In order to get all the tradeable stocks on SimuTrade, send a GET request to `/api/v1/stocks/all`.
- [ ] POST `/api/v1/trade/quote`
    - In order to get the quote of a specific quote, send a POST request to `/api/v1/stocks/quote`.
    - Request format:
        ```json
        {
            "ticker": "[ticker]"
        }
        ```
- [ ] POST `/api/v1/trade/buy`
- [ ] POST `/api/v1/trade/sell`

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
5. Seed the database
```bash
npm run seed
```
6. Run the application

```bash
npm start
```

### Future Plans
- [ ] Implement the remaining REST endpoints. See [Route Map](#route-map-usage) for current progress.
- [ ] Write Zod validation schemas for validating and type-checking requests.
- [ ] Write a `seed.ts` script to fetch the latest closing prices of stocks (primarily in the S&P500) using a [static API](https://query2.finance.yahoo.com/v8/finance/chart/).
- [ ] Write [Swagger](https://swagger.io/) documentation for the API.
- [ ] Implement different user roles (e.g., admin, regular user) with varying levels of access.
- [ ] Implement email verification for new users to ensure the validity of email addresses using SMTP. As a result, implement a `/api/v1/auth/forgot-password` end-point.
- [ ] Integrate with a real-time stock data provider to offer up-to-the-minute stock prices and market data. See [Alpaca](https://alpaca.markets/).
- [ ] Write unit tests for the codebase.
- [ ] Write a front-end for the API. Possibly port the application from [Express.js](https://expressjs.com/) to [Next.js](https://nextjs.org/). Consider potential hosting options such as [Vercel](https://vercel.com/dashboard).

### Setting up the environment

1. Create a new file called `.env` or copy the `.env.example` and rename it to `.env`.

```bash
cp .env.example .env
```

2. Complete the file to add your environment variables. It is prepopulated with potential arguments (for Postgres connection) and commands you can run (for generating JWT secret tokens) to get your `.env` file up and running.