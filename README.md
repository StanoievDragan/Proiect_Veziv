---

# Portfolio Manager

## Overview

This repository contains a full-stack application with a React frontend and a NestJS backend. The frontend and backend are organized into separate folders:

- `frontend/` - React project
- `backend/` - NestJS project

## Table of Contents

- [Frontend](#frontend)
- [Backend](#backend)
- [Database](#database)

## Frontend

The `frontend/` folder contains the React application that serves as the user interface for the application.

### Folder Structure

- `src/` - Contains the main source code for the React application.
  - `components/` - React components used throughout the application.
  - `pages/` - React components representing different pages or views.
  - `services/` - Functions for making API requests to the backend.
  - `App.js` - The root component of the React application.
  - `index.js` - The entry point of the React application.
- `public/` - Contains static assets such as HTML and images.
- `package.json` - Lists the project dependencies and scripts.

### Installation

1. Navigate to the `frontend/` directory:

   ```bash
   cd frontend
   ```

2. Install the project dependencies:

   ```bash
   npm install
   ```

### Usage

To start the React development server, use:

```bash
npm start
```

This will run the React application in development mode and open it in your default web browser. The development server will automatically reload the page when you make changes to the code.

## Backend

The `backend/` folder contains the NestJS application that serves as the server-side component of the application.

### Folder Structure

- `src/` - Contains the main source code for the NestJS application.
  - `work/` - Contains the entity, module, service and business logic for the project.
  - `main.ts` - The entry point of the NestJS application.
  - `app.module.ts` - Contains the configuration for PostgreSQL database and specifies the folder for image uploads.
- `test/` - Contains unit and integration tests for the NestJS application.
- `package.json` - Lists the project dependencies and scripts.

### Installation

1. Navigate to the `backend/` directory:

   ```bash
   cd backend
   ```

2. Install the project dependencies:

   ```bash
   npm install
   ```

### Usage

To start the NestJS development server, use:

```bash
npm run start:dev
```

This will run the NestJS application in development mode, which includes hot-reloading for changes.

## Database

This project uses PostgreSQL as the database. The NestJS application is configured to automatically mirror the models to the PostgreSQL database using TypeORM.

### Setup

1. **Install PostgreSQL:**
   Ensure PostgreSQL is installed and running on your machine. You can download and install PostgreSQL from [the official site](https://www.postgresql.org/download/).

2. **Configure PostgreSQL:**
   Update the `app.module.ts` file in the `backend/` directory with your PostgreSQL database credentials:

   ```
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'veziv',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
   ```
