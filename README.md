# Bookstore API

A RESTful API for managing a bookstore inventory, built with Express and TypeScript using an n-layered architecture.

## Prerequisites
- Node.js v24+
- npm

## Installation

git clone <your-repo-url>
cd bookstore-api
npm install


## Running the API

npm run dev

The API will start on http://localhost:3000

## Running Tests

npm test


## Architecture
- **Routes** – maps HTTP endpoints to controllers
- **Controllers** – handles requests and responses
- **Services** – business logic and validation
- **Repositories** – data access layer (in-memory store)
- **Models** – TypeScript interfaces

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /books | Get all books |
| GET | /books?genre={genre} | Get books by genre |
| GET | /books/:id | Get book by ID |
| POST | /books | Create a new book |
| PUT | /books/:id | Update a book |
| DELETE | /books/:id | Delete a book |
| GET | /books/discounted-price?genre={genre}&discount={%} | Get total discounted price for a genre |

## Example Requests

### Create a book
POST /books
{"title": "1984", "author": "George Orwell", "genre": "Fiction", "price": 75}

### Get discounted price
GET /books/discounted-price?genre=Fiction&discount=10

Response:
{"genre": "Fiction", "discount_percentage": 10, "total_discounted_price": 112.50}