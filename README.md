# FASCM Backend

## Overview
The **FASCM Backend** is the core server-side system of the *Fresh Agricultural Supply Chain Management* platform. It provides APIs and services to support transparent, traceable, and IoT-enabled management of fresh agricultural products across the supply chain.

The backend handles authentication, business logic, data persistence, and integration with IoT devices for real-time monitoring of temperature, humidity, and transportation status.

This project is developed as part of the **Capstone Project** at **FPT University**.

---

## Project Information
- **Project Name**: Digital Technology-based System for Fresh Agricultural Supply Chain Management (FASCM)
- **Project Code**: FA25SE172
- **Group**: GFA25SE133
- **Type**: Web Application (Backend API)

---

## Backend Responsibilities
The backend system is responsible for:
- User authentication and role-based authorization
- Business logic for orders, purchase orders, warehouse, and logistics
- Data storage and integrity
- IoT data ingestion and monitoring
- Notification and alert handling
- Reporting and dashboard data aggregation

---

## Supported User Roles
- **Admin**: System-wide user and configuration management
- **Manager**: Operational oversight, approvals, dashboards, IoT management
- **Warehouse Staff**: Inventory, warehouse operations, IoT monitoring
- **Delivery Staff**: Transportation, delivery status, proof upload
- **Supplier (Farmer)**: Purchase order batch management
- **Consignee (Retailer / Supermarket)**: Sale orders, payments, traceability

---

## Technology Stack

### Core Technologies
- **Framework**: NestJS (Node.js)
- **Language**: TypeScript
- **API Style**: RESTful API

### Databases
- **PostgreSQL**: Core transactional data (users, orders, warehouse, logistics)
- **MongoDB**: IoT sensor data, logs, and unstructured monitoring data

### Other Technologies
- **Authentication**: JWT-based authentication
- **Authorization**: Role-based access control (RBAC)
- **ORM**: TypeORM / Prisma (depending on implementation)
- **IoT Integration**: Sensor data ingestion (temperature, humidity, camera metadata)
- **Deployment**: Railway / Docker (optional)

---

## System Architecture (Backend)

<p align="center">
  <img src="docs/diagrams/system-architecture.svg" alt="Backend System Architecture" width="800" />
</p>

The backend follows a **layered and modular architecture**, designed to support scalability, maintainability, and IoT data integration.

### 🔹 Architecture Layers
- 🧭 **Controller Layer**
  Exposes REST APIs and handles request validation.

- ⚙️ **Service Layer**
  Implements core business logic such as orders, warehouse, and delivery workflows.

- 🗄️ **Repository / Data Access Layer**
  Manages interactions with PostgreSQL and MongoDB.

- 🔌 **Integration Layer**
  Handles IoT data ingestion, notifications, and external services.

---

## System Diagrams

> The following diagrams provide an overall understanding of the system design, business context, data model, and user interactions of the FASCM backend.

### 1. System Context Diagram
<p align="center">
  <img src="docs/diagrams/context.svg" alt="System Context Diagram" width="800" />
</p>

This diagram illustrates how the FASCM backend interacts with external actors such as suppliers, consignees, warehouse staff, delivery staff, and IoT devices.

---

### 2. Use Case Diagram
<p align="center">
  <img src="docs/diagrams/use-case.svg" alt="Use Case Diagram" width="800" />
</p>

The use case diagram describes the main system functionalities available to each user role, including order management, warehouse operations, transportation, and monitoring.

---

### 3. Entity Relationship Diagram (ERD)
<p align="center">
  <img src="docs/diagrams/erd.svg" alt="Entity Relationship Diagram" width="800" />
</p>

This ERD represents the relational database structure, highlighting key entities such as users, orders, warehouses, batches, and transportation records.

---

### 4. Conceptual Diagram
<p align="center">
  <img src="docs/diagrams/conceptual.svg" alt="Conceptual Diagram" width="800" />
</p>

The conceptual diagram provides a high-level overview of system components and their relationships, focusing on business logic rather than technical implementation details.

---


## Main Backend Modules

### Authentication & Authorization
- Login / Logout
- Password reset & change
- JWT token generation
- Role-based access control

### User Management
- Create, update, deactivate users
- Role assignment (Admin, Manager, Staff, etc.)
- Profile management

### Purchase Order Module (Supplier)
- Create purchase order batches
- Update / cancel pending batches
- View batch history and status

### Sale Order Module (Consignee)
- Create and manage sale orders
- Confirm receipt of goods
- Payment status tracking

### Warehouse Management
- Import / export goods
- Inventory tracking
- Batch classification
- Warehouse area management

### Transportation & Delivery
- Delivery scheduling
- Truck management
- Delivery status updates
- Proof image upload

### IoT Monitoring
- Register and manage IoT devices
- Receive temperature & humidity data
- Monitor real-time and historical sensor data
- Trigger alerts when thresholds are exceeded

### Notification System
- Order status notifications
- Delivery updates
- IoT alerts
- System messages

### Reporting & Dashboard
- KPI aggregation
- Order and warehouse statistics
- IoT device status reports

---

## Database Design Overview

### PostgreSQL (Relational Data)
- Users & Roles
- Suppliers & Consignees
- Purchase Orders & Sale Orders
- Warehouses & Areas
- Inventory & Batches
- Transportation & Delivery
- Payments

### MongoDB (NoSQL Data)
- IoT sensor readings
- Environmental logs (temperature, humidity)
- Device status history
- Monitoring and alert logs

---

## API Conventions
- RESTful endpoint naming
- Standardized JSON responses
- HTTP status codes for success and error handling
- Centralized exception handling

Example response format:
```json
{
  "success": true,
  "data": {},
  "message": "Operation successful"
}
```

---

## Environment Variables
Example `.env` configuration:

```env
# Server
PORT=3000
NODE_ENV=development

# PostgreSQL
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=fascm
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres

# MongoDB
MONGO_URI=mongodb://localhost:27017/fascm_iot

# JWT
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
```

---

## Docker Support

The backend supports **Docker & Docker Compose** for consistent development and deployment environments.

### Docker Services
- **backend**: NestJS application
- **postgres**: PostgreSQL database
- **mongo**: MongoDB for IoT data

### Docker Compose Overview
The system uses `docker-compose` to orchestrate all required services, ensuring easy setup for development, testing, and deployment.

---

## Installation & Running

> **Note**
> - **First time setup**: follow **all steps** below.
> - **From the second run onward**: only **Step 2** and **Step 6** are required.

---

### 1. Clone Repository
```bash
git clone <repository-url>
cd fascm-be
```

Copy environment configuration:
```bash
cp env-example-relational .env
```

Update `.env` values:
- Change `DATABASE_HOST=postgres` → `DATABASE_HOST=localhost`
- Change `MAIL_HOST=maildev` → `MAIL_HOST=localhost`

---

### 2. Run Required Containers (Database & Tools)
Start PostgreSQL, Adminer, and MailDev using Docker Compose:

```bash
docker compose up -d postgres adminer maildev
```

Or start all services:
```bash
docker compose up -d
```

---

### 3. Install Dependencies
```bash
npm install
```

---

### 4. Run Database Migrations
```bash
npm run migration:run
```

---

### 5. Run Database Seeds
```bash
npm run seed:run:relational
```

---

### 6. Run Application (Development Mode)
```bash
npm run dev
```

---

### Access URLs
- **Backend API**: http://localhost:8080
- **Swagger API Docs**: http://localhost:8080/docs

---

### Database Migration (When Database Schema Changes)
Generate a new migration:
```bash
npm run migration:generate -- src/database/migrations/<migration-name>
```

Apply migrations:
```bash
npm run migration:run
```

---


## Testing
- Unit tests for services
- Integration tests for APIs
- IoT data simulation for development

```bash
npm run test
```

---

## Security Considerations
- JWT-based authentication
- Role-based authorization
- Input validation and sanitization
- Secure password hashing
- Audit logging for critical actions

---

## Limitations
- IoT monitoring limited to temperature, humidity, and camera data
- No third-party logistics or accounting system integration
- Web application only (no mobile backend)
- Domestic Vietnam supply chain focus

---

## Team Members
- Nguyễn Thái Thanh – Team Leader
- Bùi Đức Hoàng
- Trần Tiến Sang
- Huỳnh Đoàn Thanh Phong
- Trương Văn Phát

---

## License
This project is developed for academic purposes as a Capstone Project at FPT University.
