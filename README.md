# 📚 Library Management API

A full-featured RESTful API built with **Express.js**, **TypeScript**, and **MongoDB (via Mongoose)** to manage library books and borrowing operations.

---


## 🚀 Features

- ✅ Create, read, update, and delete (CRUD) books
- ✅ Borrow books with quantity and due date
- ✅ Enforce business logic (copy availability, due date validation)
- ✅ Filtering, sorting, and pagination on books
- ✅ Borrowed books summary using MongoDB aggregation
- ✅ Mongoose static methods, instance methods, and middleware
- ✅ Full TypeScript typing and validation
- ✅ Proper error handling and standard response format

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express
- **Language:** TypeScript
- **Database:** MongoDB
- **ODM:** Mongoose
- **Validation:** Mongoose Schema Validation
- **Dev Tools:** Nodemon, ts-node, dotenv

---
[![Live Site](https://img.shields.io/badge/View-Live-green)](https://lv2-assignment03.vercel.app)

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/pmppiyas/Lv2Assignment03.git
cd Lv2Assignment03

# Install dependencies
npm install

# Create a .env file
cp .env.example .env
