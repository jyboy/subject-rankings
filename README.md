# Subject Rankings App

A full-stack mini-program to show the subject rankings of Chinese universities, utilizing a B/S architecture, responsive design, and mainstream technology stacks.

[![Build Status](https://img.shields.io/github/actions/workflow/status/jyboy/subject-rankings/client-tests.yml?branch=master)](https://github.com/jyboy/subject-rankings/actions)
[![Codecov Coverage](https://codecov.io/github/jyboy/subject-rankings/branch/master/graph/badge.svg?token=VGMIDABYYC)](https://codecov.io/github/jyboy/subject-rankings)
[![Cypress Status](https://img.shields.io/endpoint?url=https://cloud.cypress.io/badge/simple/741ucu/master&style=flat&logo=cypress)](https://cloud.cypress.io/projects/741ucu/runs)
[<img src="https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white" alt="Cloudflare Page" style="height: 20px; border-radius: 3px">](https://subject-rankings.pages.dev)

## Demo

Check out the live demo: [subject-rankings.pages.dev](https://subject-rankings.pages.dev/)

## Features

- 🌟 Modern and concise UI design
- 📱 Responsive for PC and mobile
- 🌐 Native support for English internationalization
- ⚛️ React and Redux for the client-side
- 🔧 TypeScript and Cloudflare services for the server-side
- ✅ Comprehensive unit tests, integration tests, and E2E tests
- ⚙️ Automated CI/CD workflows

## Getting Started

### Prerequisites

- Node.js (version >= 18)
- pnpm (version >= 8)

### Installation

- Clone the repository:

```sh
git clone git@github.com:jyboy/subject-rankings.git
```

- Install dependencies for the server:

```sh
cd subject-rankings/server
pnpm install
```

- Install dependencies for the client:

```sh
cd ../client
pnpm install
```

### Development

To start the server in development mode:

```sh
cd server
pnpm run dev
```

To start the client in development mode:
```sh
cd client
pnpm run dev
```

### Linting & Formatting

To identify linting errors:

- Server: `pnpm run lint` from the server directory.
- Client: `pnpm run lint` from the client directory.

To format your code:

- Server: `pnpm run format` from the server directory.
- Client: `pnpm run format` from the client directory.

### Testing

Execute tests:

- Server: `pnpm run test` from the server directory for backend tests.
- Client: `pnpm run test` from the client directory for frontend tests.

## License

This project is licensed under the [MIT License](LICENSE).
