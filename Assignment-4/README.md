# Secure Connect and Communication Platform
1. `npm install`
2. Make sure MongoDB is running; adjust `.env` (copy from `.env.example`)
3. `npm start` -> http://localhost:5000 (open it in two browser tabs to test chat)

| Method | Endpoint | Access |
|---|---|---|
| POST | /api/auth/signup | public |
| POST | /api/auth/login | public (returns JWT + sets cookie) |
| POST | /api/auth/logout | public |
| GET | /api/profile | JWT |
| POST/GET | /api/notes | JWT (own notes; admin sees all) |
| GET/PUT/DELETE | /api/notes/:id | JWT (owner or admin) |
| GET | /api/admin/users | JWT + admin role |

Send the token as `Authorization: Bearer <token>` or via the `token` cookie.
Signing up with the email in `ADMIN_EMAIL` creates an admin.

Socket.IO events: `joinRoom`, `leaveRoom`, `chatMessage`, `typing` (client -> server);
`chatMessage`, `history`, `systemMessage`, `typing`, `notification` (server -> client).
