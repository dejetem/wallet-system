# Financial Wallet System

A backend service for a financial wallet system with user authentication and transaction management, built with Node.js, TypeScript, and Clean Architecture.

## Features

- User authentication (signup/login) with JWT
- Wallet management (credit, debit, balance check)
- Transaction history
- PostgreSQL database
- Docker containerization
- API documentation with Swagger
- Unit tests
- Input validation
- Security best practices

## Prerequisites

- Node.js 18+
- PostgreSQL
- Docker (optional)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd wallet-system
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the database:
```bash
docker-compose up postgres -d
```

5. Run migrations:
```bash
npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d src/infrastructure/database/data-source.ts
```

6. Start the application:
```bash
# Development
npm run dev

# Production
npm run build
npm start
```

## Docker
1. To run with Docker:
```bash
docker-compose up --build
```

## API Documentation
After starting the server, visit http://localhost:3000/api-docs for Swagger documentation.

## Testing
```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## API Endpoints
### Authentication
- POST /api/auth/signup - User registration

- POST /api/auth/login - User login

### Wallet (Requires Authentication)
- GET /api/wallet/balance - Get wallet balance

- POST /api/wallet/credit - Credit wallet

- POST /api/wallet/debit - Debit wallet

### Transactions (Requires Authentication)
- GET /api/transactions/history - Get transaction history