# To-Do List API (Mini-Task)

A lightweight, robust RESTful API built with Node.js and Express for managing a to-do list or notes. This project handles full CRUD (Create, Read, Update, Delete) operations using an in-memory data store.

Here's the API planning and specification document link : https://docs.google.com/document/d/1N0Oa9C49F72zVQ3vKYiiCD59nJAVXxg1CGUHjghFC_I/edit?usp=sharing

## 🚀 Features

- **Create Notes**: Add new notes with titles and descriptions.
- **Read Notes**: Fetch the complete list of stored notes.
- **Update Notes**: Modify existing notes selectively using `PATCH`.
- **Delete Notes**: Safely remove notes by their index without leaving empty slots in memory.
- **Input Validation & Safety**: Includes server-crash prevention checks for invalid routes or missing indices.

---

## 🛠️ Tech Stack

- **Runtime Environment:** Node.js
- **Framework:** Express.js

---

## 💻 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
```bash
   git clone [https://github.com/shreyadwivedi003/to_do_list-Mini-Task-.git](https://github.com/shreyadwivedi003/to_do_list-Mini-Task-.git)
   cd to_do_list-Mini-Task-
   ```

### 🚀 How to Run:
Before you begin, ensure you have Node.js and npm (Node Package Manager) installed. You can check if they are installed by running these commands in your terminal:

- Step 1: Clone the Repository
```bash
git clone https://github.com/shreyadwivedi003/to_do_list-Mini-Task-.git
cd to_do_list-Mini-Task-
```

- Step 2: Install Dependencies
```bash
npm init -y
npm install express
```

- Step 3: Start the Server
```bash
node server.js
```

If you are planning to make changes to the code and don't want to manually restart the server every time you hit save, run this instead:
```bash
npx nodemon server.js
```