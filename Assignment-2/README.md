# Student Management REST API

A simple REST API built with Node.js and Express.js to manage student records using CRUD operations. No database is used — student data is stored in a plain JavaScript array in memory.

## Course Info
- **Course:** Web Dev III (Node.js & Express Backend)
- **Unit:** Unit-2
- **Assignment:** Lab Assignment 2

## Project Structure
```
Assignment-2/
├── app.js
├── routes/
│   └── studentRoutes.js
├── middleware/
│   └── logger.js
├── data/
│   └── students.js
├── package.json
└── README.md
```

## Features
- Express server setup
- Modular routing using `express.Router()`
- Custom logger middleware that logs method, URL, and time for every request
- Full CRUD operations on student records
- Proper HTTP status codes for success and error cases

## Required APIs

| Method | Route | Description |
|---|---|---|
| GET | `/students` | Get all students |
| GET | `/students/:id` | Get a single student by id |
| POST | `/students` | Add a new student |
| PUT | `/students/:id` | Update an existing student |
| DELETE | `/students/:id` | Delete a student |

## Status Codes Used
- `200` – Success
- `201` – Created
- `400` – Bad Request (missing fields)
- `404` – Student Not Found

## Tech Stack
- Node.js
- Express.js
- Postman (for testing)

## How to Run
1. Clone this repository.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   node app.js
   ```
4. Server runs at `http://localhost:3000`

## Testing with Postman
- `GET http://localhost:3000/students`
- `GET http://localhost:3000/students/1`
- `POST http://localhost:3000/students` — JSON body: `{ "name": "Neha", "course": "MCA" }`
- `PUT http://localhost:3000/students/1` — JSON body: `{ "course": "MBA" }`
- `DELETE http://localhost:3000/students/2`

## Author
Submitted as part of Web Dev III Lab Assignment 2.