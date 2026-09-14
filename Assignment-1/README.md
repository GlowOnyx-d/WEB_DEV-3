# Smart Utility Toolkit

A collection of small Node.js command-line and server utilities built using only Node's core modules — no external packages or frameworks.

## Course Info
- **Course:** Web Dev III (Node.js & Express Backend)
- **Unit:** Unit-1
- **Assignment:** Lab Assignment 1

## Project Structure
```
smart-utility-toolkit/
├── calculator.js
├── app.js
├── server.js
├── fileManager.js
├── dice.js
├── modules/
│   ├── isEven.js
│   └── logger.js
└── README.md
```

## Features

### 1. CLI Calculator (`calculator.js`)
Performs add, subtract, multiply, and divide operations using command-line arguments.

```
node calculator.js add 10 5
node calculator.js div 5 0
```

### 2. Custom Modules (`modules/isEven.js`, `modules/logger.js`)
- `isEven.js` — checks if a number is even or odd.
- `logger.js` — logs messages to the console with a timestamp.

Used together in `app.js`:
```
node app.js
```

### 3. HTTP Server (`server.js`)
A basic server using Node's `http` module with multiple routes.

| Route | Response |
|---|---|
| `/` | Welcome message |
| `/about` | About page |
| `/contact` | Contact page |
| Any other route | 404 Not Found |

```
node server.js
```
Then visit `http://localhost:3000/` in a browser.

### 4. File Manager (`fileManager.js`)
Performs Create, Read, Update, and Delete operations on a file using the `fs` module, with error handling for each step.

```
node fileManager.js
```

### 5. Random Dice Generator (`dice.js`)
Generates random dice rolls (1–6) using Node's `crypto` module.

```
node dice.js
```

## Tech Stack
- Node.js (JavaScript runtime)
- Core modules only: `process`, `http`, `fs`, `crypto`

## How to Run
1. Clone or download this repository.
2. Make sure Node.js is installed.
3. Run any file using `node <filename>.js` as shown above.

## Author
Submitted as part of Web Dev III Lab Assignment 1.