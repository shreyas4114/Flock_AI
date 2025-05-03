# 🛍️ Shared Wishlist App

A full-stack collaborative wishlist manager where users can sign up, create shared wishlists, and add/edit products with real-time collaboration in future scope.

🔗 **Live Demo**: [https://wishlistapp-ten.vercel.app](https://wishlistapp-ten.vercel.app)

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

## ScreenShots

1. Signup and login functionality (Actually implemented)

![image](https://github.com/user-attachments/assets/7bc678c1-d146-4b1b-954c-d2e010c34cca)

![image](https://github.com/user-attachments/assets/4beba157-abaf-4ca3-87bc-2beee4e1aa13)

2. Dashboard

![image](https://github.com/user-attachments/assets/fbbb3eee-d327-4ec0-8bfe-33c8dffdee4e)

3. Invite other members to your wishlist (Actually Implemented)
   
   provide email address of other signed-up users to invite

![image](https://github.com/user-attachments/assets/f2ae25a7-3bd2-451a-af89-7055ff999540)

4. Add products into the wishlist
   
![image](https://github.com/user-attachments/assets/16bcfc55-afe0-4f9a-a0a4-d8a99c9b11ff)

5. Update or delete a product

![image](https://github.com/user-attachments/assets/404e8b91-683b-4bf1-a7a7-a763956ac25f)



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

- User Sign Up / Login (JWT-based) (NOT Mocked, actual auth functionality)
- Create and manage multiple wishlists
- Add, edit, delete products with name, image URL, and price
- Show the user who added each product
- Invite collaborators to wishlists (Implemented)
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

