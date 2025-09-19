# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Node.js Express.js API with authentication functionality, built using ES6 modules and modern JavaScript practices. The project uses Drizzle ORM with PostgreSQL (specifically Neon Database) for data persistence and follows a clean, layered architecture.

## Development Commands

### Primary Development

- `npm run dev` - Start development server with hot reloading using Node.js `--watch` flag
- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Auto-fix linting issues where possible
- `npm run format` - Format code using Prettier
- `npm run format:check` - Check if code formatting is consistent

### Database Operations

- `npm run db:generate` - Generate Drizzle migration files from schema changes
- `npm run db:migrate` - Apply pending migrations to the database
- `npm run db:studio` - Open Drizzle Studio for database visualization and management

## Architecture Overview

### Project Structure

The codebase follows a modular architecture with clear separation of concerns:

```
src/
├── config/          # Configuration files (database, logger)
├── controllers/     # Request handlers and business logic
├── middlewares/     # Express middleware functions
├── models/          # Drizzle ORM schema definitions
├── routes/          # Express route definitions
├── services/        # Business logic and database operations
├── utils/           # Helper functions and utilities
└── validations/     # Zod schema validation
```

### Module Resolution

The project uses Node.js subpath imports with `#` prefix for cleaner imports:

- `#config/*` → `./src/config/*`
- `#controllers/*` → `./src/controllers/*`
- `#middlewares/*` → `./src/middlewares/*`
- `#models/*` → `./src/models/*`
- `#routes/*` → `./src/routes/*`
- `#services/*` → `./src/services/*`
- `#utils/*` → `./src/utils/*`
- `#validations/*` → `./src/validations/*`

### Key Technologies

- **Express.js 5.x** - Web framework with modern middleware stack
- **Drizzle ORM** - Type-safe database ORM with PostgreSQL
- **Neon Database** - Serverless PostgreSQL database
- **Winston** - Structured logging with file and console outputs
- **Zod** - Runtime type validation for API inputs
- **JWT** - Authentication token management
- **bcrypt** - Password hashing
- **ESLint + Prettier** - Code quality and formatting

### Database Layer

- Uses Drizzle ORM with PostgreSQL dialect
- Database connection configured through environment variables
- Migration files stored in `./drizzle/` directory
- Models defined using Drizzle's schema syntax in `src/models/`
- Currently implements a `users` table with authentication fields

### Authentication Flow

The application implements JWT-based authentication:

1. User registration validates input using Zod schemas
2. Passwords are hashed using bcrypt before storage
3. JWT tokens are issued upon successful authentication
4. Tokens are stored in HTTP-only cookies for security
5. User roles support ('admin', 'user') for authorization

### Logging Strategy

- Winston logger configured with environment-based log levels
- Separate error and combined log files in `logs/` directory
- Console logging in development with colorized output
- Request logging integrated via Morgan middleware

### Error Handling

- Centralized error handling through Express error middleware
- Validation errors formatted using custom utility functions
- Structured error responses with appropriate HTTP status codes
- Database constraint violations handled gracefully

## Environment Setup

Required environment variables (see `.env.example`):

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment mode (development/production)
- `LOG_LEVEL` - Winston log level (default: info)
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT token signing
- `JWT_EXPIRES_IN` - Token expiration time

## Code Style Guidelines

### ESLint Configuration

- Uses ES2022 with module syntax
- Enforces single quotes and semicolons
- 2-space indentation with switch case indentation
- Unix-style line endings
- Allows console usage (common in Node.js APIs)
- Enforces modern JavaScript practices (const over var, arrow functions)

### File Naming

- Use kebab-case for filenames (e.g., `auth.controller.js`)
- Include function type in filename (controller, service, model, etc.)
- Use descriptive names that reflect the module's purpose

## Development Workflow

1. **Database Changes**: Modify schema in `src/models/`, run `npm run db:generate`, then `npm run db:migrate`
2. **API Development**: Follow the layered architecture (routes → controllers → services → models)
3. **Validation**: Define Zod schemas in `src/validations/` for all API inputs
4. **Error Handling**: Use structured error responses and leverage the logging system
5. **Code Quality**: Run `npm run lint:fix` and `npm run format` before committing

## Testing Database Connection

Use `npm run db:studio` to verify database connectivity and inspect data through Drizzle Studio's web interface.
