# 🌍 Full-Stack Location Management Application

A secure, multi-page web application that allows authenticated users to **manage and visualize location data** using an interactive map.  
Users can **manually add locations** or **upload them via ZIP files**, with real-time updates and **user-specific data isolation**.

---

## 🚀 Live Demo & Walkthrough

🎥 **Project Walkthrough Video:** [Watch on Loom](https://www.loom.com/share/c74991af9aaa4f1c81bd6962958fa7b4?sid=85468c2a-5eed-45a8-b68b-acf61a079679)

## 🔗 **Live Link:** [https://location-management-app.vercel.app/](https://location-management-app.vercel.app/)

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Screenshots](#-screenshots)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Usage](#-usage)
- [File Upload Format](#-file-upload-format)
- [Authentication Flow](#-authentication-flow)
- [Contact](#-contact)

---

## 📌 Overview

This application was built as part of a **technical assessment** for a **Full-Stack Developer** position.  
It enables users to **securely log in, add locations, and view them instantly on an interactive map** without page reloads.

All location data is **isolated per user**, ensuring privacy and security.

---

## ✨ Features

✅ **User Authentication** (JWT-based) – Registration & Login  
✅ **Protected Routes** – Map & File Upload only accessible when logged in  
✅ **Interactive Map** – Built with `react-leaflet`  
✅ **Real-Time Updates** – Locations appear instantly without refreshing  
✅ **File Upload Support** – Upload a ZIP containing exactly one `.txt` file with locations  
✅ **Validation** – Errors shown for invalid ZIPs or incorrect file format  
✅ **User-Specific Data** – No data leakage between accounts  
✅ **Responsive UI** – Styled with Tailwind CSS  
✅ **Logout & Navigation** – Sidebar navigation system

---

## 🛠 Tech Stack

**Frontend:**

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Leaflet](https://react-leaflet.js.org/)
- [Axios](https://axios-http.com/)

**Backend:**

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/) (or MySQL)
- [JWT](https://jwt.io/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [Multer](https://www.npmjs.com/package/multer) for file uploads
- [Adm-Zip](https://www.npmjs.com/package/adm-zip) for ZIP file parsing

---

## 🏗 Architecture

```plaintext
Frontend (Next.js)
    |
    |-- API calls via Axios
    v
Backend (Express.js + Node.js)
    |
    |-- Auth Routes (JWT)
    |-- Location Routes (CRUD)
    |-- File Upload & Parsing
    v
Database (PostgreSQL)
```

---

## ⚙ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/location-management-app.git
cd location-management-app
```

### 2️⃣ Install Dependencies

**Backend**

```bash
cd server
npm install
```

**Frontend**

```bash
cd client
npm install
```

### 3️⃣ Set Up Database

- Create a PostgreSQL/MySQL database.
- Run the migration scripts in `/server/migrations`.

### 4️⃣ Configure Environment Variables

Create a `.env` file in both `client` and `server` directories.

---

## 🔑 Environment Variables

**Backend (`server/.env`)**

```env
PORT=5000
DATABASE_URL=
NODE_ENV=
JWT_SECRET=
FRONTEND_URL=
```

**Frontend (`client/.env`)**

```env
BASE_URL=
```

---

## ▶ Usage

**Run Backend**

```bash
cd server
npm run dev
```

**Run Frontend**

```bash
cd client
npm run dev
```

---

## 📂 File Upload Format

Your `.zip` file **must** contain **exactly one `.txt` file** with the following format:

```txt
Name, Latitude, Longitude
Suria KLCC,3.157324409,101.7121981
Zoo Negara,3.21054160,101.75920504
```

---

## 🔒 Authentication Flow

1. User registers with email & password.
2. Backend hashes password with `bcrypt`.
3. Backend returns JWT on login.
4. Frontend stores JWT in local storage.
5. Protected pages verify token before rendering.

---

## 📬 Contact

👤 **Praveen Singh**
📧 [pvnsingh05@gmail.com](mailto:your.email@example.com)
🔗 [LinkedIn](https://linkedin.com/in/mrprvn)
💻 [GitHub](https://github.com/mrprvn)
