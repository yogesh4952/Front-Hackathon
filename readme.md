# Hackathon Portal Project

This is a MERN stack hackathon management system.

## Setup Instructions
1. Install dependencies for both client and server:
   - `cd client && npm install`
   - `cd server && npm install`
2. Configure `.env` files:
   - Server `.env` should contain `PORT`, `DB_URL`, `SECRET_STRING`, `EMAIL`, and `PASSWORD`.
3. Run the application:
   - Server: `npm run start` (from server folder)
   - Client: `npm run dev` (from client folder)

> [!NOTE]
> Sensitive credentials have been moved to the `.env` file for security.