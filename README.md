# SimuTrade API

SimuTrade API is a RESTful API built using [Express.js](https://expressjs.com/) and [Docker](https://www.docker.com/). It provides a platform for managing and trading simulated stocks and portfolios.

## Getting Started

### Dependencies

- [Node.js](https://nodejs.org/en/download/package-manager/)
- [Docker](https://www.docker.com/)

### Route Map
- [x] POST /api/v1/auth/register
- [x] POST /api/v1/auth/login
- [x] POST /api/v1/auth/refreshToken
- [x] POST /api/vi/auth/revokeRefreshTokens (For Demo Only!)
- [ ] GET /api/v1/users/profile (Work In Progress)
- [ ] GET /api/v1/users/holdings
- [ ] GET /api/v1/users/trades
- [ ] GET /api/v1/stocks
- [ ] POST /api/v1/trade/buy
- [ ] POST /api/v1/trade/sell
- [ ] POST /api/v1/trade/quote

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