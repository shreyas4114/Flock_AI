# 🛍️ Shared Wishlist App

A full-stack collaborative wishlist manager where users can sign up, create shared wishlists, and add/edit products with real-time collaboration in future scope.

---

## 📦 Tech Stack

**Frontend**  
- React.js (via Vite)  
- Tailwind CSS  
- React Router  
- Axios  

**Backend**  
- Node.js  
- Express.js  
- MongoDB with Mongoose  
- JWT for authentication  
- CORS middleware  

---

## ⚙️ Setup Instructions

Clone the repository:
   ```bash
   git clone https://github.com/shreyas4114/Flock_AI
   cd Flock_AI
   ```

### 🖥️ Backend Setup

1. Install dependencies:
   ```bash
   cd server
   npm install
   ```

3. Create a `.env` file:
   ```env
   PORT = 5000
   MONGO_URI = your_mongodb_connection_uri
   JWT_SECRET = your_jwt_secret
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### 💻 Frontend Setup

1. Install dependencies:
   ```bash
   cd client
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

---

## ✅ Core Features

- User Sign Up / Login (JWT-based) (NOT Mock, actual auth functionality)
- Create and manage multiple wishlists
- Add, edit, delete products with name, image URL, and price
- Show the user who added each product
- Invite collaborators to wishlists (mocked for now)
- Fully responsive design

---

## 📌 Assumptions & Limitations

### ✅ Assumptions
- Each user can create **multiple wishlists**.
- Each wishlist can have **multiple collaborators**.
- JWT token is used to authenticate and identify users.
- Inviting users is mocked by email (user must already exist).
- All users have equal rights in a shared wishlist.

### ⚠️ Limitations
- Real-time collaboration is **not implemented yet** (WebSocket planned).
- No email verification or password reset flows.
- Invitations aren't sent — only added internally by user ID.

---

## 👨‍💻 Developed by

**Shreyas Fatale**  
[GitHub](https://github.com/shreyas4114)

