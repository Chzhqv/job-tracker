# job-tracker

A personal job application tracker (Kanban-style: Applied, Interview, Offer, Rejected).

## Architecture

Two separate pieces, run as two separate processes:

- **Server** (this repo) — Node.js + Express REST API. Owns all data, no UI.
- **Client** (`job-tracker-ui`, separate repo, added later) — plain HTML/CSS/JS calling the API via `fetch`.

```
Browser (job-tracker-ui) --fetch--> Server (job-tracker API) --> Storage
```

## Stack

- Node.js, Express
- Jest + Supertest (unit tests), Hurl (integration tests)
- Docker, GitHub Actions
- AWS: DynamoDB, S3, Cognito (or JWT)

## Getting Started

```sh
git clone https://github.com/chzhqv/job-tracker.git
cd job-tracker
npm install
cp .env.example .env
npm start
```

_More detail (routes, auth setup) will be added here as they're implemented._

## License

MIT — see [LICENSE](./LICENSE).
