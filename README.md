# MERN Blog Application - Backend

This is the backend server for the MERN Blog Application built with **Node.js**, **Express**, and **MongoDB**. It provides RESTful APIs to handle user authentication and blog management.

---
## 🚀 Live Demo

🔗 [Click here to view the live server](https://blog-server-rev.onrender.com)

---

## ⚙️ Tech Stack

- **Node.js**
- **Express**
- **MongoDB** with Mongoose
- **JWT** for authentication
- **dotenv** for environment configuration
- **bcryptjs** for password hashing
- **cors** for enabling cross-origin requests

---

## 📁 Folder Structure
```bash
server/
├── public/
│   └── # all the static files
├── src/
│   ├── app/
|   |   └── index.js
│   ├── config/
|   |   └── cors.config.js
│   ├── controllers/
|   |   ├── blog.Controller.js
|   |   └── user.Controller.js
│   ├── controllers/
|   |   ├── blog.Controller.js
|   |   └── user.Controller.js
│   ├── database/
|   |   └── connect.mongo.db.js
│   ├── middleware/
|   |   └── user.Auth.js
│   ├── models/
|   |   ├── blog.Model.js
|   |   └── user.Model.js
│   ├── routes/
|   |   ├── blog.routes.js
|   |   └── user.routes.js
│   └── services/
|       ├── cronJob.service.js
|       └── serverInfo.service.js
├── .env
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or above)
- npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/AnshulKaryal/blog-server-rev.git
cd blog-server-rev
```
2. Install dependencies:

```bash
npm install
```

3. Create a .env file in the root directory:

```bash
PORT=3027
MONGODB_URI=mongodb://localhost:27017/blogapp
JWT_SECRET=your_jwt_secret_key
```

4. Start the backend server:

```bash
npm run dev
```
By default, the server runs on http://localhost:3027.

---
## 🧑‍💻 How It Works

- `server.js` in the root is the main entry point of the backend.
- It imports the Express app from `src/app/app.js`.
- All main logic is structured inside the `src/` folder:
  - **Routes** for auth and blogs.
  - **Controllers** for handling business logic.
  - **Models** for MongoDB schema using Mongoose.
  - **Middleware** for authentication (JWT token verification).

---
## 📨 API Documentation
All available routes and request formats are documented in the Postman collection below:

👉 [Postman API Documentation](https://documenter.getpostman.com/view/33734742/2sB2cUB3RT)

---

## 📌 Notes
- Make sure the backend server is running for full functionality of frontend client.