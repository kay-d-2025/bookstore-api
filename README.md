# Bookstore API

A RESTful API for managing a bookstore inventory, built with **Express** and **TypeScript** 
using an n-layered architecture (Routes → Controllers → Services → Repositories → Models).

## Prerequisites

- Node.js v18+
- npm

## Installation

git clone https://github.com/kay-d-2025/bookstore-api.git
cd bookstore-api
npm install

## Configuration

Copy the example environment file and adjust if needed:

cp .env.example .env

| Variable | Default | Description        |
|----------|---------|--------------------|
| PORT     | 3000    | Port to run API on |

## Running the API

# Development (with hot reload)
npm run dev

# Production
npm run build
npm start

The API will be available at http://localhost:3000

## Running Tests

# Run all tests
npm test

# Run with coverage report
npx jest --coverage

## API Endpoints

| Method | Endpoint                                              | Description                        |
|--------|-------------------------------------------------------|------------------------------------|
| GET    | /books                                                | Get all books                      |
| GET    | /books?genre={genre}                                  | Get books filtered by genre        |
| GET    | /books/:id                                            | Get a book by ID                   |
| POST   | /books                                                | Create a new book                  |
| PUT    | /books/:id                                            | Update an existing book            |
| DELETE | /books/:id                                            | Delete a book                      |
| GET    | /books/discounted-price?genre={genre}&discount={pct}  | Get total discounted price by genre|

## Example Requests

### Create a book
POST /books
Content-Type: application/json

{
  "title": "1984",
  "author": "George Orwell",
  "genre": "Fiction",
  "price": 75
}

### Get discounted price for a genre
GET /books/discounted-price?genre=Fiction&discount=10

Response:
{
  "genre": "Fiction",
  "discount_percentage": 10,
  "total_discounted_price": 112.50
}

## Architecture

- **Routes** — maps HTTP endpoints to controllers
- **Controllers** — handles requests/responses, passes to services
- **Services** — business logic and input validation
- **Repositories** — in-memory data access layer
- **Models** — TypeScript interfaces

## Author

K Delport