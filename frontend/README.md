# Frontend - Notes App UI

This is the frontend client for the Full-Stack Notes Application, built using **React**, **Vite**, and **Tailwind CSS**. It communicates with an Express/MongoDB backend to provide full CRUD (Create, Read, Update, Delete) capabilities.

---

## 🛠️ Tech Stack

- **Framework:** React.js (via [Vite](https://vitejs.dev/))
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Deployment:** Vercel

---

## 🚀 Getting Started Locally

### 1. Install Dependencies
Navigate to the `frontend` folder and install the required npm packages:
```bash
cd frontend
npm install
```

# 2.Configure Environment Variables
Create a .env file in the frontend root directory and add your backend API endpoint:
```bash
VITE_API_URL=http://localhost:3000
```
# 3. Run the Development Server
```bash
npm run dev
```
# Folder Structure
frontend/
├── src/
│   ├── components/
│   │   ├── Create.jsx    # Component to create new notes
│   │   └── Edit.jsx      # Component to edit existing notes
│   ├── App.jsx           # Main App entry point
│   ├── Home.jsx          # Dashboard layout & note listing
│   └── main.jsx          # React DOM render root
├── .env                  # Environment variables
├── package.json
└── vite.config.js

## Key Features
-Create Notes: Simple form submission to add new notes with titles and descriptions.
-Dynamic List: Instantly updates state without needing full page reloads.
-Inline Editing: Edit existing notes using the dedicated Edit.jsx component.
-Delete Functionality: Delete notes directly from the UI with real-time UI updates.
