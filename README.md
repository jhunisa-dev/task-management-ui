# Task Management UI 📝
A modern, responsive frontend application for the **Task Management platform**.
Built to interact seamlessly with the **Spring Boot backend**, providing distinct interfaces for **standard users** and **system administrators**.

## 📸 Screenshots
```markdown
![User Dashboard](screenshots/user-dashboard.png)
![Admin Panel](screenshots/admin-panel.png)
```

## 🚀 Tech Stack

* **React** (with Vite)
* **TypeScript**
* **Tailwind CSS** (for styling)
* **Axios** (for API communication)
* **React Router** (for navigation)

## ✨ Key Features

### 🔐 Dynamic Routing
Protected routes ensure users can only access dashboards they are authorized to view.

### 📋 User Dashboard
A clean interface where users can:
* Create tasks
* Edit tasks
* Track due dates
* Manage their personal task list

### 🛠️ Admin Control Panel
A dedicated portal for administrators to:
* View all system tasks
* Manage user accounts
* Safely remove users via confirmation modals

### 📱 Responsive Design
Fully styled with **Tailwind CSS** to look great on both **desktop and mobile devices**.

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/task-management-ui.git
cd task-management-ui
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the root directory and add your backend API URL:
```env
VITE_API_BASE_URL=http://localhost:8080/api
```

### 4️⃣ Start the Development Server
```bash
npm run dev
```

The application will start at:
```
http://localhost:5173
```
