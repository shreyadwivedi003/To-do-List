# 📝 Full-Stack To-Do & Notes Manager

A full-stack, responsive To-Do / Notes application built using the **MERN** stack (MongoDB, Express.js, React.js, Node.js). The application allows users to create, view, edit, and delete tasks in real time with continuous persistence in a cloud database.

---

## 🚀 Live Demo

- **Frontend App (Vercel):** [https://to-do-list-cyan-one-96.vercel.app](https://to-do-list-cyan-one-96.vercel.app/)
- **Backend API (Render):** [https://to-do-list-bbu3.onrender.com](https://to-do-list-bbu3.onrender.com)

---

## 🛠️ Tech Stack & Architecture

### **Frontend**
- **Library:** React.js (built with Vite)
- **HTTP Client:** Axios / Fetch API
- **Styling:** CSS3 / Modern Flexbox & Grid
- **Hosting:** Vercel

### **Backend**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database Object Modeling:** Mongoose (MongoDB ODM)
- **Middleware:** CORS, dotenv
- **Hosting:** Render

### **Database**
- **Cloud Database:** MongoDB Atlas

---

## 📁 Repository Structure

To-do-List/
├── backend/
│   ├── src/
│   │   ├── Controllers/
│   │   │   └── controllers.js
│   │   ├── models/
│   │   │   └── notes.model.js
│   │   ├── Routes/
│   │   │   └── routes.js
│   │   ├── services/
│   │   │   └── todoService.js
│   │   └── app.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Create.jsx
    │   │   ├── Edit.jsx
    │   │   └── Home.jsx
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── .env

## ⚡ Features
-Full CRUD Operations: Create, Read, Update, and Delete notes seamlessly.
-RESTful API Architecture: Clean separation of concerns between backend controllers, routes, and database models.
-Cloud Data Persistence: Powered by MongoDB Atlas.
-Cross-Origin Resource Sharing (CORS): Backend configured to accept secure cross-origin requests from the Vercel deployment.
-Environment Configuration: Sensitive DB URI keys and API endpoints secured using .env variables.

## 💻 Local Setup & Installation
Prerequisites: Node.js (v18 or higher),Git,A free MongoDB Atlas database instance.
### 1. Clone the Repository
```bash
git clone [https://github.com/shreyadwivedi003/To-do-List.git](https://github.com/shreyadwivedi003/To-do-List.git)
cd To-do-List
```
### 2. Backend Setup
```bash
cd backend
npm install
npm start
# or 
npx nodemon server.js
```
Put environment variable MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/todolist?retryWrites=true&w=majority
PORT=3000
### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Put environment variable VITE_API_URL=http://localhost:3000


## ☁️ Deployment Instructions
### Backend on Render
1. Create a Web Service on Render.
2. Connect your GitHub repository and set the settings:
 -Root Directory: backend
 -Build Command: npm install
 -Start Command: node server.js
3. Add environment variable MONGO_URI with your MongoDB connection string.

### Frontend on Vercel
1. Import project into Vercel.
2. Framework Preset: Vite.
3. Set Root Directory to frontend.
4. Add environment variable VITE_API pointing to your deployed Render URL.
