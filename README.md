# 📋 Task Manager App

An Angular application for managing tasks and users.  
Built with **Nebular UI Kit**, **RxJS**, and supports data persistence in memory or via `localStorage`.

---

## 🛠️ Tech Stack

- **Angular** v12–v20  
- **Nebular UI Kit**  
- **RxJS**  
- **TypeScript**

---

## 🎯 Features

### 🔹 Tasks
- List all tasks  
- Create new task  
- Edit existing task  
- Delete task  

**Minimal task fields:**
- `name` — task title  
- `description` — task details  
- `createdAt` — creation date  
- `updatedAt` — modification date  
- `state` — one of:
  - `in queue`
  - `in progress`
  - `done`

---

### 🔹 Users
- List all users  
- Create new user  
- Edit user  
- Delete user  

**Minimal user fields:**
- `name` — user’s name  

---

## 📌 Business Rules

1. Each task can be assigned to **one user only**.  
2. A task without an assigned user can only be in the **`in queue`** state.  
3. A single user cannot have more than **one task** in the **`in progress`** state.  

---

## 👀 UI Requirements

- **Task list** should display:  
  - name  
  - creation & modification dates  
  - assigned user  
  - state  

- **User list** should display:  
  - name  
  - assigned tasks  

---

## 💾 Data Storage

- In-memory state management (via RxJS store)  
- Optionally persisted in browser `localStorage`  

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm start
# or
ng serve
