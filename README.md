# Fantagram 

A full-stack social media application inspired by Instagram, built using the MERN stack. Users can create accounts, share posts with images, like posts, comment on posts, and manage their own content.

## Live Demo

### Frontend

https://fantagram-01.vercel.app

### Backend API

https://fantagram-backend.onrender.com

## Features

* User Signup & Login
* JWT Authentication
* Create Posts
* Upload Images
* View Feed
* Like Posts
* Comment on Posts
* Delete Own Posts
* User Profile Dashboard
* Responsive UI
* MongoDB Atlas Integration

## Tech Stack

### Frontend

* React.js
* Material UI
* Axios
* React Router

### Backend

* Node.js
* Express.js
* JWT Authentication
* Multer (Image Uploads)

### Database

* MongoDB Atlas
* Mongoose

## Project Structure

```bash
Fantagram/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── uploads/
│   └── server.js
│
└── README.md
```

## Installation

### Clone Repository

```bash
git clone https://github.com/REDOOCBOON/Fantagram.git
cd Fantagram
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=8000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Start Backend:

```bash
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
REACT_APP_API_URL=http://localhost:8000/api
```

Start Frontend:

```bash
npm start
```

## Test Credentials

### User 1

Email:

```text
ujjwal@gmail.com
```

Password:

```text
123456
```

### User 2

Email:

```text
harshita@gmail.com
```

Password:

```text
123456
```

## API Endpoints

### Authentication

```http
POST /api/auth/signup
POST /api/auth/login
```

### Posts

```http
GET    /api/posts
POST   /api/posts
PUT    /api/posts/:id/like
POST   /api/posts/:id/comment
DELETE /api/posts/:id
```

## Deployment

Frontend:

* Vercel

Backend:

* Render

Database:

* MongoDB Atlas

## Author

**Ujjwal**

Email: [ujjwal@gmail.com](mailto:ujjwal@gmail.com)

GitHub: https://github.com/REDOOCBOON
