# To-Do List API (Mini-Task)

A lightweight, robust RESTful API built with Node.js and Express for managing a to-do list or notes. This project handles full CRUD (Create, Read, Update, Delete) operations using an isolated, in-memory data store.

---

## 🛠️ Tech Stack

- **Runtime Environment:** Node.js
- **Framework:** Express.js

---

## 💻 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed locally on your machine.

### 1. Installation & Setup
Clone this repository to your local computer, navigate into the project directory, initialize the package configuration, and install Express:

```bash
git clone [https://github.com/shreyadwivedi003/to_do_list-Mini-Task-.git](https://github.com/shreyadwivedi003/to_do_list-Mini-Task-.git)
cd to_do_list-Mini-Task-
npm init -y
npm install express
```

### 2. Running the Application
To start the backend server locally, run the entrypoint execution file:

```bash
node server.js
💡 Pro-Tip: Restarting the server manually every time you make a change can be tedious and irritating. To automate server restarts whenever you edit your files, run this instead:
```

```bash
npx nodemon server.js
```
Once booted up, the application will successfully listen for incoming HTTP requests locally at:

http://localhost:3000


### 🚀 Key Features & Architectural Decisions
Sequential Auto-Increment IDs: Every note has a static, progressive unique ID number to maintain permanent reference paths, preventing index-shifting errors.

-True Partial Updates: The PATCH API handles partial updates by only updating what is changed. For eg: If only description is updated then the title will remain same and only description will be uodated without causing error.

-Contiguous Deletions: Uses .findIndex() and .splice() to safely slides data upon deletion, eliminating array "holes" or "null".

-Error Responses: Rejects malformed bodies or non-existenting IDs using error tracking status codes (for eg: 400 Bad Request, 404 Not Found).

-Data pre-processing: Pre-processes input data by using .trim() function to remove blank spaces or empty text bodies from taking unnecessary space in the data array.