# GymLog

GymLog is a full-stack web application designed to help users track their gym workouts, log exercises, and monitor their fitness progress. 

## 🛠 Tech Stack

### Backend
* **Platform:** .NET 10.0
* **Framework:** ASP.NET Core Web API
* **Database:** PostgreSQL 15
* **ORM:** Entity Framework Core (Code-First approach)
* **Authentication:** ASP.NET Core Identity + JWT (HttpOnly cookies for enhanced security)
* **API Documentation:** Swagger / OpenAPI

### Frontend
* **Library:** React 19
* **Language:** TypeScript
* **Build Tool:** Vite
* **Routing:** React Router DOM

### Infrastructure & DevOps
* **Containerization:** Docker
* **Orchestration:** Docker Compose (configured for DB, API, and Web client)

## 🚀 Key Features
* Secure user registration and authentication.
* Comprehensive exercise catalog (CRUD operations).
* Custom workout creation and management.
* Detailed logging of workout sets and reps.

## Architecture & Patterns

This project implements a structured architecture utilizing:

* **N-Tier Architecture**: Separation of concerns between Controllers, Business Logic (Services), and Data Access layers.
* **Dependency Injection**: Fully utilized for loosely coupled components.
* **Asynchronous Programming**: Extensively used throughout the application to ensure non-blocking operations.

## 💻 Getting Started

The project is fully containerized, making local setup straightforward.

1. Clone the repository:
   ```bash
   git clone [https://github.com/fractall8/GymLog.git](https://github.com/fractall8/GymLog.git)
2. Set up environment variables (create a `.env` file based on a provided `.env.example`).
3. Build and run the containers:
    ```bash
    docker-compose up --build
    ```
4. Access the application:
* Frontend: http://localhost:3000
* Backend API & Swagger: http://localhost:8080/swagger
