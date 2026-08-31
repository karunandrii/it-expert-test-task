# API Test Framework

## Setup

- Node.js 18+
- `npm install`

## How to Run

- `npm run test` - Run all tests
- `npm run test:parallel` - Run all tests in parallel
- `npm run lint` - Lint code
- `npm run format` - Format code

## Summary

### Framework Structure

```
src/
├── clients/           # API client implementations
│   ├── dummyJson.client.js
│   └── jsonPlaceholder.client.js
├── controllers/       # Business logic layer
│   ├── auth.controller.js
│   ├── user.controller.js
│   └── post.controller.js
├── lib/              # Core utilities
│   ├── request.js        # HTTP client base class & builder
│   └── controllersProvider.js  # Dependency injection container
├── schemas/          # OpenAPI YAML validation schemas
├── config/
│   └── env.js        # Environment configuration
└── utils/
    ├── schemaValidator.js
    └── testData.js
```

### Key Design Decisions

**1. Builder Pattern for HTTP Client**

- Reason: Provides fluent, chainable configuration for creating HTTP clients
- Tradeoff: Slightly more boilerplate than direct constructor, but more flexible and testable
- Benefit: Easy to configure different base URLs, headers, and timeouts

**2. Controllers Layer**

- Reason: Abstracts API operations from HTTP concerns; business logic stays testable
- Controllers map to specific endpoints: `AuthController` (login/users), `PostController` (CRUD)
- Tradeoff: Additional abstraction layer, but cleaner separation from raw HTTP

**3. Dependency Injection with Provider**

- Reason: `controllersProvider` singleton manages client and controller lifecycle
- Benefit: Lazy initialization, single responsibility, easy to reset for test isolation
- Improves testability and prevents state leakage between tests

**4. OpenAPI Schema Validation**

- Reason: Validates response structure matches expected contract
- Benefit: Catches breaking API changes early; schemas are documentation
- Used in 2 endpoints as requirement: POST /auth/login and POST /posts

**5. Environment-Based Configuration**

- Base URLs loaded from `.env` file with sensible fallbacks
- Enables running tests against different environments (dev, staging, prod)

### Scaling to 100+ Tests

This framework scales without major refactoring due to:

1. **Modular Controllers** - New endpoints get new controller methods; existing tests unaffected
2. **Provider Pattern** - Central `controllersProvider` manages all dependencies
3. **Reusable Test Data** - `generateDummyJsonValidUser()` for randomized data
4. **Schema Validation** - One-time schema setup, reused across multiple tests. As an additional step for scalability would be auto-creation of schemas and auto-validation within request.
5. **Parallel Test Execution** - Jest supports `--maxWorkers` flag for horizontal scaling
6. **Clear Naming** - Organized by tags (@Task1, @Task2)

### Growth Path for 100+ Tests

- Add new controllers under `src/controllers/`
- Register them in `controllersProvider.js`
- Create corresponding test suites in `tests/`
- Add schemas to `src/schemas/` as needed
- Framework remains unchanged; only additive growth
