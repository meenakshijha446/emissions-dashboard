# Emissions Dashboard Backend

Spring Boot REST API for emissions data and chat functionality.

## Prerequisites

- Java 17 or higher
- Maven 3.6+

## Running the Application

1. Build the project:
```bash
mvn clean install
```

2. Run the application:
```bash
mvn spring-boot:run
```

The API will be available at `http://localhost:8080`

## API Endpoints

### Emissions Data
- `GET /api/emissions` - Get all emissions data
- `GET /api/emissions/industries` - Get all industries
- `GET /api/emissions/sectors` - Get all sectors
- `GET /api/emissions/summary/industry` - Get emissions summary by industry
- `GET /api/emissions/summary/sector` - Get emissions summary by sector
- `GET /api/emissions/summary/year` - Get emissions summary by year

### Chat
- `POST /api/chat` - Send a chat message
  - Body: `{ "message": "your question", "searchInternet": true/false }`


