# Emissions Dashboard

A full-stack application for tracking and analyzing carbon emissions across different industries and sectors, built for Stride Labs: HackForward 2025.

## Features

- 📊 **Interactive Dashboard**: Visualize emissions data with charts and graphs
- 💬 **Chat Panel**: Ask questions about emissions data
- 🔍 **Internet Search**: Query the web for latest emissions information
- 🎨 **Modern UI**: Intuitive and user-centric design

## Tech Stack

### Backend
- Java 17
- Spring Boot 3.2.0
- Maven
- H2 Database (in-memory)

### Frontend
- Angular 17
- Chart.js / ng2-charts
- TypeScript
- CSS3

## Project Structure

```
emissions-project/
├── backend/          # Spring Boot application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/emissions/
│   │   │   │   ├── controller/    # REST controllers
│   │   │   │   ├── service/       # Business logic
│   │   │   │   └── model/         # Data models
│   │   │   └── resources/
│   │   └── test/
│   └── pom.xml
└── frontend/         # Angular application
    ├── src/
    │   ├── app/
    │   │   ├── components/        # UI components
    │   │   └── services/          # API services
    │   └── styles.css
    └── package.json
```

## Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- Maven 3.6+
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Build and run:
```bash
mvn clean install
mvn spring-boot:run
```

Backend will run on `http://localhost:8080`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

Frontend will run on `http://localhost:4200`

## Usage

1. **View Dashboard**: The main dashboard displays emissions statistics and charts
2. **Ask Questions**: Use the chat panel to ask about emissions data
3. **Search Internet**: Enable "Search Internet" checkbox to fetch latest information from the web

## API Documentation

### Emissions Endpoints
- `GET /api/emissions` - Get all emissions data
- `GET /api/emissions/industries` - List all industries
- `GET /api/emissions/sectors` - List all sectors
- `GET /api/emissions/summary/industry` - Summary by industry
- `GET /api/emissions/summary/sector` - Summary by sector
- `GET /api/emissions/summary/year` - Summary by year

### Chat Endpoint
- `POST /api/chat` - Send chat message
  ```json
  {
    "message": "Show emissions by industry",
    "searchInternet": false
  }
  ```

## Deployment

### Backend
Build the JAR file:
```bash
cd backend
mvn clean package
java -jar target/emissions-dashboard-1.0.0.jar
```

### Frontend
Build for production:
```bash
cd frontend
npm run build
```

Deploy the `dist/emissions-dashboard` folder to your web server.

## Notes

- The application uses sample data for demonstration
- Internet search functionality uses a simulated response (integrate with SerpAPI or Google Custom Search API for production)
- CORS is enabled for development (configure properly for production)

## License

This project is created for Stride Labs: HackForward 2025 competition.


